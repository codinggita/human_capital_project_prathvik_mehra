const Price = require("../models/price.model");

// Aggregate and compare complex analytics perfectly
const compareCountriesService = async (country1, country2) => {
  const [c1Data, c2Data] = await Promise.all([
    Price.aggregate([
      { $match: { countryCode: String(country1).toUpperCase() } },
      {
        $group: { _id: null, avg: { $avg: "$value" }, max: { $max: "$value" } },
      },
    ]),
    Price.aggregate([
      { $match: { countryCode: String(country2).toUpperCase() } },
      {
        $group: { _id: null, avg: { $avg: "$value" }, max: { $max: "$value" } },
      },
    ]),
  ]);

  return {
    [country1]: c1Data[0] || { avg: 0, max: 0 },
    [country2]: c2Data[0] || { avg: 0, max: 0 },
  };
};

const compareYearsService = async (year1, year2) => {
  const [y1Data, y2Data] = await Promise.all([
    Price.aggregate([
      { $match: { year: Number(year1) } },
      { $group: { _id: null, avg: { $avg: "$value" } } },
    ]),
    Price.aggregate([
      { $match: { year: Number(year2) } },
      { $group: { _id: null, avg: { $avg: "$value" } } },
    ]),
  ]);

  return {
    [year1]: y1Data[0]?.avg || 0,
    [year2]: y2Data[0]?.avg || 0,
  };
};

const compareIndicatorsService = async (ind1, ind2) => {
  const [i1Data, i2Data] = await Promise.all([
    Price.aggregate([
      { $match: { indicatorCode: String(ind1).toUpperCase() } },
      { $group: { _id: null, avg: { $avg: "$value" } } },
    ]),
    Price.aggregate([
      { $match: { indicatorCode: String(ind2).toUpperCase() } },
      { $group: { _id: null, avg: { $avg: "$value" } } },
    ]),
  ]);

  return {
    [ind1]: i1Data[0]?.avg || 0,
    [ind2]: i2Data[0]?.avg || 0,
  };
};

module.exports = {
  compareCountries: compareCountriesService,
  compareYears: compareYearsService,
  compareIndicators: compareIndicatorsService,
};
