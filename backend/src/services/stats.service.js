const Price = require("../models/price.model");

// Aggregate statistics using MongoDB pipelines for maximum performance on 190k records
const getPriceStatisticsService = async () => {
  const stats = await Price.aggregate([
    {
      $group: {
        _id: null,
        totalRecords: { $sum: 1 },
        averageValue: { $avg: "$value" },
        maxValue: { $max: "$value" },
        minValue: { $min: "$value" },
      },
    },
  ]);
  return stats[0] || {};
};

const getHighestValueService = async () => {
  // Sort descending by value and pick the first document using lean()
  return Price.findOne().sort("-value").lean();
};

const getLowestValueService = async () => {
  // Sort ascending, ignoring null values
  return Price.findOne({ value: { $ne: null } })
    .sort("value")
    .lean();
};

const getMonthlyAverageService = async () => {
  return Price.aggregate([
    { $match: { month: { $ne: null } } },
    { $group: { _id: "$month", average: { $avg: "$value" } } },
    { $sort: { _id: 1 } }, // Sort Jan to Dec
  ]);
};

const getYearlyAverageService = async () => {
  return Price.aggregate([
    { $group: { _id: "$year", average: { $avg: "$value" } } },
    { $sort: { _id: -1 } }, // Sort newest to oldest
  ]);
};

const getTopCountriesService = async () => {
  return Price.aggregate([
    { $group: { _id: "$countryName", recordCount: { $sum: 1 } } },
    { $sort: { recordCount: -1 } },
    { $limit: 10 },
  ]);
};

const getTopIndicatorsService = async () => {
  return Price.aggregate([
    { $group: { _id: "$indicatorName", recordCount: { $sum: 1 } } },
    { $sort: { recordCount: -1 } },
    { $limit: 10 },
  ]);
};

const getValueDistributionService = async () => {
  return Price.aggregate([
    {
      $bucketAuto: {
        groupBy: "$value",
        buckets: 6,
        output: { count: { $sum: 1 } }
      }
    },
    {
      $project: {
        _id: 0,
        range: { $concat: [{ $toString: { $round: ["$_id.min", 1] } }, " - ", { $toString: { $round: ["$_id.max", 1] } }] },
        count: 1
      }
    }
  ]);
};

const getFrequencyDistributionService = async () => {
  return Price.aggregate([
    { $group: { _id: "$frequency", value: { $sum: 1 } } },
    { $project: { _id: 0, name: "$_id", value: 1 } },
    { $sort: { value: -1 } }
  ]);
};

const getRecordsCountService = async () => {
  return { total: await Price.estimatedDocumentCount() }; // Faster than countDocuments
};

const getTrendingStatisticsService = async () => {
  return { trending: true };
};

const getOverviewStatsService = async () => {
  const [totalPrices, topCountries] = await Promise.all([
    Price.estimatedDocumentCount(),
    getTopCountriesService(),
  ]);
  return { totalPrices, topCountries };
};

const getCountryStatsService = async (countryCode) => {
  return Price.aggregate([
    { $match: { countryCode: String(countryCode).toUpperCase() } },
    {
      $group: {
        _id: "$countryCode",
        avgValue: { $avg: "$value" },
        count: { $sum: 1 },
      },
    },
  ]);
};

const getYearStatsService = async (year) => {
  return Price.countDocuments({ year: Number(year) });
};

const getMonthStatsService = async (month) => {
  return Price.countDocuments({ month: Number(month) });
};

module.exports = {
  getPriceStatistics: getPriceStatisticsService,
  getHighestValue: getHighestValueService,
  getLowestValue: getLowestValueService,
  getMonthlyAverage: getMonthlyAverageService,
  getYearlyAverage: getYearlyAverageService,
  getTopCountries: getTopCountriesService,
  getTopIndicators: getTopIndicatorsService,
  getValueDistribution: getValueDistributionService,
  getFrequencyDistribution: getFrequencyDistributionService,
  getRecordsCount: getRecordsCountService,
  getTrendingStatistics: getTrendingStatisticsService,
  getOverviewStats: getOverviewStatsService,
  getCountryStats: getCountryStatsService,
  getYearStats: getYearStatsService,
  getMonthStats: getMonthStatsService,
};
