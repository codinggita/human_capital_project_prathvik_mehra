const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = require('../config/db');
const { Country } = require('../models/country.model');
const { Indicator } = require('../models/indicator.model');
const { DataPoint } = require('../models/dataPoint.model');

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
      DataPoint.deleteMany({})
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
            country: REF_AREA.toUpperCase(),
            indicator: INDICATOR.toUpperCase(),
            value: numericValue,
            year: parseInt(Year, 10),
            month: parseInt(Month, 10),
            frequency: FREQ === 'M' ? 'monthly' : 'monthly'
          });
        }
      }
    }

    console.log(`Found ${uniqueCountries.size} unique countries.`);
    console.log(`Found ${uniqueIndicators.size} unique indicators.`);
    console.log(`Filtered and prepared ${dataPointsToInsert.length} valid data points.`);

    // 1. Bulk Insert Countries
    console.log('Inserting Countries metadata...');
    const countryDocs = Array.from(uniqueCountries.entries()).map(([code, name]) => ({
      _id: code,
      name
    }));
    await Country.insertMany(countryDocs);
    console.log('Countries metadata inserted successfully.');

    // 2. Bulk Insert Indicators
    console.log('Inserting Indicators metadata...');
    const indicatorDocs = Array.from(uniqueIndicators.entries()).map(([code, label]) => ({
      _id: code,
      label
    }));
    await Indicator.insertMany(indicatorDocs);
    console.log('Indicators metadata inserted successfully.');

    // 3. Batch Insert DataPoints
    console.log('Inserting timeseries DataPoints in batches...');
    const batchSize = 5000;
    for (let i = 0; i < dataPointsToInsert.length; i += batchSize) {
      const batch = dataPointsToInsert.slice(i, i + batchSize);
      await DataPoint.insertMany(batch, { ordered: false });
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
