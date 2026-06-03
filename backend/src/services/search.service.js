const Price = require("../models/price.model");
const Country = require("../models/country.model");
const Indicator = require("../models/indicator.model");
const { getPagination, getPaginationMeta } = require("../utils/pagination");

// Base regex search function utilizing lean() for fast text matching
const baseSearch = async (Model, searchField, searchTerm, queryObj) => {
  const { page, limit, skip } = getPagination(queryObj);

  // Create a case-insensitive regex pattern
  const filter = searchTerm
    ? { [searchField]: { $regex: searchTerm, $options: "i" } }
    : {};

  const [data, totalDocs] = await Promise.all([
    Model.find(filter).skip(skip).limit(limit).lean(),
    Model.countDocuments(filter),
  ]);

  return { data, pagination: getPaginationMeta(totalDocs, page, limit) };
};

const searchPricesService = (queryObj) =>
  baseSearch(Price, "indicatorName", queryObj.q || "", queryObj);
const searchCountryService = (queryObj) =>
  baseSearch(Country, "countryName", queryObj.name || "", queryObj);
const searchIndicatorService = (queryObj) =>
  baseSearch(Indicator, "indicatorName", queryObj.text || "", queryObj);

const searchValueService = async (queryObj) => {
  const filter = { value: Number(queryObj.value) || 0 };
  const data = await Price.find(filter).limit(20).lean();
  return { data, pagination: {} };
};

const searchYearService = async (queryObj) => {
  const data = await Price.find({ year: Number(queryObj.year) })
    .limit(20)
    .lean();
  return { data, pagination: {} };
};

const searchMonthService = async (queryObj) => {
  const data = await Price.find({ month: Number(queryObj.month) })
    .limit(20)
    .lean();
  return { data, pagination: {} };
};

const searchFrequencyService = async (queryObj) => {
  const data = await Price.find({
    frequency: String(queryObj.freq).toUpperCase(),
  })
    .limit(20)
    .lean();
  return { data, pagination: {} };
};

const advancedCombinedSearchService = async (queryObj) => {
  // Skeleton ready for complex $and / $or dynamic aggregations
  return { data: [], pagination: {} };
};

const globalSearchService = async (queryObj) => {
  return { data: [], pagination: {} };
};

module.exports = {
  searchPrices: searchPricesService,
  searchCountry: searchCountryService,
  searchIndicator: searchIndicatorService,
  searchValue: searchValueService,
  searchYear: searchYearService,
  searchMonth: searchMonthService,
  searchFrequency: searchFrequencyService,
  advancedSearch: advancedCombinedSearchService,
  globalSearch: globalSearchService,
};
