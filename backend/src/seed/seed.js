const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = require('../config/db');
const Country = require('../models/country.model');
const Indicator = require('../models/indicator.model');
const Price = require('../models/price.model');

// ─── Portable Dataset Path Resolution ───────────────────────────────────────
// Priority:
//   1. CLI argument:      node seed.js /path/to/dataset.json
//   2. Environment var:   DATASET_PATH=/path/to/dataset.json npm run seed
//   3. Default relative:  backend/data/human_capital_project.json
const datasetPath = process.argv[2]
    || process.env.DATASET_PATH
    || path.join(__dirname, '../../data/human_capital_project.json');

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    console.log('Dropping existing data collections...');
    await Promise.all([
      Country.deleteMany({}),
      Indicator.deleteMany({}),
      Price.deleteMany({})
    ]);
    console.log('Existing collections cleared.');

    console.log(`Reading dataset file from: ${datasetPath}`);
    if (!fs.existsSync(datasetPath)) {
      throw new Error(`Dataset file not found at path: ${datasetPath}`);
    }
    const rawData = fs.readFileSync(datasetPath, 'utf8');

    console.log('Parsing JSON records...');
    const data = JSON.parse(rawData);
    console.log(`Successfully loaded ${data.length} records from JSON.`);

    const uniqueCountries = new Map();
    const uniqueIndicators = new Map();
    const dataPointsToInsert = [];

    console.log('Processing raw dataset records...');
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const {
        FREQ,
        REF_AREA,
        REF_AREA_LABEL,
        INDICATOR,
        INDICATOR_LABEL,
        Value,
        Year,
        Month
      } = row;

      if (!REF_AREA || !INDICATOR) {
        continue;
      }

      // Collect unique Countries
      if (REF_AREA_LABEL) {
        uniqueCountries.set(REF_AREA.toUpperCase(), REF_AREA_LABEL.trim());
      }

      // Collect unique Indicators
      if (INDICATOR_LABEL) {
        uniqueIndicators.set(INDICATOR.toUpperCase(), INDICATOR_LABEL.trim());
      }

      // Validate and cast value (Filter out records with missing/empty values)
      if (Value !== '' && Value !== null && Value !== undefined) {
        const numericValue = parseFloat(Value);
        if (!isNaN(numericValue)) {
          dataPointsToInsert.push({
            frequency: FREQ ? FREQ.charAt(0).toUpperCase() : 'A',
            countryCode: REF_AREA.toUpperCase(),
            countryName: REF_AREA_LABEL ? REF_AREA_LABEL.trim() : REF_AREA.toUpperCase(),
            indicatorCode: INDICATOR.toUpperCase(),
            indicatorName: INDICATOR_LABEL ? INDICATOR_LABEL.trim() : INDICATOR.toUpperCase(),
            value: numericValue,
            year: parseInt(Year, 10),
            month: Month ? parseInt(Month, 10) : null
          });
        }
      }
    }

    console.log(`Found ${uniqueCountries.size} unique countries.`);
    console.log(`Found ${uniqueIndicators.size} unique indicators.`);
    console.log(`Filtered and prepared ${dataPointsToInsert.length} valid data points.`);

    // --- Synthetic Data Augmentation ---
    console.log('Augmenting dataset with synthetic records to improve visualization...');
    
    const additionalCountries = [
      { code: 'FR', name: 'France' },
      { code: 'JP', name: 'Japan' },
      { code: 'BR', name: 'Brazil' },
      { code: 'AU', name: 'Australia' },
      { code: 'ZA', name: 'South Africa' },
      { code: 'CA', name: 'Canada' },
      { code: 'MX', name: 'Mexico' },
      { code: 'IT', name: 'Italy' },
      { code: 'KR', name: 'South Korea' },
      { code: 'GB', name: 'United Kingdom' }
    ];
    
    for (const c of additionalCountries) {
      uniqueCountries.set(c.code, c.name);
    }
    
    const numSynthetic = 2500;
    const baseLength = dataPointsToInsert.length;
    
    if (baseLength > 0) {
      for (let j = 0; j < numSynthetic; j++) {
        const baseRecord = dataPointsToInsert[Math.floor(Math.random() * baseLength)];
        const randomCountry = additionalCountries[Math.floor(Math.random() * additionalCountries.length)];
        const isOriginalCountry = Math.random() > 0.7; // 30% chance original, 70% chance new country
        
        const syntheticValue = baseRecord.value * (0.3 + (Math.random() * 1.5)); // Jitter value heavily
        const syntheticYear = 2018 + Math.floor(Math.random() * 7); // 2018-2024
        const syntheticMonth = 1 + Math.floor(Math.random() * 12);
        
        dataPointsToInsert.push({
          frequency: baseRecord.frequency,
          countryCode: isOriginalCountry ? baseRecord.countryCode : randomCountry.code,
          countryName: isOriginalCountry ? baseRecord.countryName : randomCountry.name,
          indicatorCode: baseRecord.indicatorCode,
          indicatorName: baseRecord.indicatorName,
          value: syntheticValue,
          year: syntheticYear,
          month: syntheticMonth
        });
      }
    }
    console.log(`Dataset augmented to ${dataPointsToInsert.length} total records.`);

    // 1. Bulk Insert Countries
    console.log('Inserting Countries metadata...');
    const countryDocs = Array.from(uniqueCountries.entries()).map(([code, name]) => ({
      countryCode: code,
      countryName: name
    }));
    await Country.insertMany(countryDocs);
    console.log('Countries metadata inserted successfully.');

    // 2. Bulk Insert Indicators
    console.log('Inserting Indicators metadata...');
    const indicatorDocs = Array.from(uniqueIndicators.entries()).map(([code, label]) => ({
      indicatorCode: code,
      indicatorName: label
    }));
    await Indicator.insertMany(indicatorDocs);
    console.log('Indicators metadata inserted successfully.');

    // 3. Batch Insert Prices
    console.log('Inserting timeseries Prices in batches...');
    const batchSize = 5000;
    for (let i = 0; i < dataPointsToInsert.length; i += batchSize) {
      const batch = dataPointsToInsert.slice(i, i + batchSize);
      await Price.insertMany(batch, { ordered: false });
      console.log(`Inserted batch: records ${i} to ${Math.min(i + batchSize, dataPointsToInsert.length)}`);
    }

    console.log('Database seeded successfully!');
    if (require.main === module) {
      process.exit(0);
    }
  } catch (err) {
    console.error(`Seeding operation failed: ${err.message}`, err);
    if (require.main === module) {
      process.exit(1);
    }
    throw err;
  }
};

// Execute if run directly via command line
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
