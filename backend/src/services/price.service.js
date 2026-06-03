const Price = require("../models/price.model");
const { buildQuery, buildSort } = require("../utils/queryBuilder");
const { getPagination, getPaginationMeta } = require("../utils/pagination");

// Base fetching function optimized with lean() and parallel Promise execution
const fetchPricesBase = async (queryObj, extraFilters = {}) => {
  const filter = { ...buildQuery(queryObj), ...extraFilters };
  const sort = buildSort(queryObj);
  const { page, limit, skip } = getPagination(queryObj);

  // Execute database queries in parallel for high performance on 190k records
  const [data, totalDocs] = await Promise.all([
    Price.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Price.countDocuments(filter),
  ]);

  return { data, pagination: getPaginationMeta(totalDocs, page, limit) };
};

const getAllPricesService = (queryObj) => fetchPricesBase(queryObj);

const getSinglePriceService = async (id) => {
  const price = await Price.findById(id).lean();
  if (!price) {
    const err = new Error("Price record not found");
    err.statusCode = 404;
    throw err;
  }
  return price;
};

const createPriceService = async (priceData) => Price.create(priceData);

const replacePriceService = async (id, priceData) => {
  return Price.findOneAndReplace({ _id: id }, priceData, {
    new: true,
    runValidators: true,
  });
};

const updatePriceService = async (id, priceData) => {
  return Price.findByIdAndUpdate(id, priceData, {
    new: true,
    runValidators: true,
  });
};

const deletePriceService = async (id) => Price.findByIdAndDelete(id);

// Advanced queries dynamically injecting filters into the base query engine
const getLatestPricesService = (queryObj) => {
  queryObj.sort = "-year,-month";
  return fetchPricesBase(queryObj);
};

const getRecentPricesService = (queryObj) => {
  queryObj.sort = "-createdAt";
  return fetchPricesBase(queryObj);
};

const getRandomPricesService = async (queryObj) => {
  const limit = Number(queryObj.limit) || 10;
  // Use MongoDB native aggregation for efficient random sampling
  const data = await Price.aggregate([{ $sample: { size: limit } }]);
  return { data, pagination: { total: limit, limit, page: 1, pages: 1 } };
};

const getTrendingPricesService = (queryObj) => fetchPricesBase(queryObj);

const getHighValuePricesService = (queryObj) =>
  fetchPricesBase(queryObj, { value: { $gt: 100 } });
const getLowValuePricesService = (queryObj) =>
  fetchPricesBase(queryObj, { value: { $lt: 50 } });

// Parameterized injections
const getPricesByCountryService = (countryCode, queryObj) =>
  fetchPricesBase(queryObj, { countryCode });
const getPricesByYearService = (year, queryObj) =>
  fetchPricesBase(queryObj, { year });
const getPricesByMonthService = (month, queryObj) =>
  fetchPricesBase(queryObj, { month });
const getPricesByIndicatorService = (indicator, queryObj) =>
  fetchPricesBase(queryObj, { indicatorCode: indicator });
const getPricesByFrequencyService = (freq, queryObj) =>
  fetchPricesBase(queryObj, { frequency: freq });
const getPricesByValueService = (value, queryObj) =>
  fetchPricesBase(queryObj, { value });
const getPricesByRangeService = (startYear, endYear, queryObj) =>
  fetchPricesBase(queryObj, { year: { $gte: startYear, $lte: endYear } });

// Complex compound injections
const getCountryPricesByYearService = (countryCode, year, queryObj) =>
  fetchPricesBase(queryObj, { countryCode, year });
const getCountryPricesByMonthService = (countryCode, month, queryObj) =>
  fetchPricesBase(queryObj, { countryCode, month });
const getCountryLatestPricesService = (countryCode, queryObj) => {
  queryObj.sort = "-year,-month";
  return fetchPricesBase(queryObj, { countryCode });
};
const getCountryPriceHistoryService = (countryCode, queryObj) => {
  queryObj.sort = "year,month";
  return fetchPricesBase(queryObj, { countryCode });
};

const getHighestPricesInYearService = (year, queryObj) => {
  queryObj.sort = "-value";
  return fetchPricesBase(queryObj, { year });
};
const getLowestPricesInYearService = (year, queryObj) => {
  queryObj.sort = "value";
  return fetchPricesBase(queryObj, { year });
};
const getHighestPricesInMonthService = (month, queryObj) => {
  queryObj.sort = "-value";
  return fetchPricesBase(queryObj, { month });
};
const getLowestPricesInMonthService = (month, queryObj) => {
  queryObj.sort = "value";
  return fetchPricesBase(queryObj, { month });
};

const getHighestPricesService = (queryObj) => {
  queryObj.sort = "-value";
  return fetchPricesBase(queryObj);
};

const getLowestPricesService = (queryObj) => {
  queryObj.sort = "value";
  return fetchPricesBase(queryObj);
};

module.exports = {
  getAllPrices: getAllPricesService,
  getSinglePrice: getSinglePriceService,
  createPrice: createPriceService,
  replacePrice: replacePriceService,
  updatePrice: updatePriceService,
  deletePrice: deletePriceService,
  getLatestPrices: getLatestPricesService,
  getRecentPrices: getRecentPricesService,
  getRandomPrices: getRandomPricesService,
  getTrendingPrices: getTrendingPricesService,
  getHighValuePrices: getHighValuePricesService,
  getLowValuePrices: getLowValuePricesService,
  getPricesByCountry: getPricesByCountryService,
  getPricesByYear: getPricesByYearService,
  getPricesByMonth: getPricesByMonthService,
  getPricesByIndicator: getPricesByIndicatorService,
  getPricesByFrequency: getPricesByFrequencyService,
  getPricesByValue: getPricesByValueService,
  getPricesByYearRange: getPricesByRangeService,
  getCountryPricesByYear: getCountryPricesByYearService,
  getCountryPricesByMonth: getCountryPricesByMonthService,
  getLatestCountryPrices: getCountryLatestPricesService,
  getCountryPriceHistory: getCountryPriceHistoryService,
  getHighestPricesInYear: getHighestPricesInYearService,
  getLowestPricesInYear: getLowestPricesInYearService,
  getHighestPricesInMonth: getHighestPricesInMonthService,
  getLowestPricesInMonth: getLowestPricesInMonthService,
  getHighestPrices: getHighestPricesService,
  getLowestPrices: getLowestPricesService,
};
