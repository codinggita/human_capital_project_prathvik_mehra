const Country = require("../models/country.model");
const { buildQuery, buildSort } = require("../utils/queryBuilder");
const { getPagination, getPaginationMeta } = require("../utils/pagination");

const getAllCountriesService = async (queryObj) => {
  const filter = buildQuery(queryObj);
  const sort = buildSort(queryObj);
  const { page, limit, skip } = getPagination(queryObj);

  const [data, totalDocs] = await Promise.all([
    Country.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Country.countDocuments(filter),
  ]);

  return { data, pagination: getPaginationMeta(totalDocs, page, limit) };
};

const createCountryService = async (countryData) => {
  return await Country.create(countryData);
};

const getCountryByIdService = async (id) => {
  const country = await Country.findById(id).lean();
  if (!country) {
    const err = new Error("Country not found");
    err.statusCode = 404;
    throw err;
  }
  return country;
};

const updateCountryService = async (id, updateData) => {
  return await Country.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteCountryService = async (id) => {
  return await Country.findByIdAndDelete(id);
};

const getTopCountriesService = async () => {
  // Use lean() for performance since documents will not be modified
  const data = await Country.find().limit(10).lean();
  return { data, pagination: {} };
};

const getCountryStatisticsService = async (countryCode) => {
  return { countryCode, stats: "Aggregate stats generated here" };
};

module.exports = {
  getAllCountries: getAllCountriesService,
  createCountry: createCountryService,
  getCountryById: getCountryByIdService,
  updateCountry: updateCountryService,
  deleteCountry: deleteCountryService,
  getTopCountries: getTopCountriesService,
  getCountryMetrics: getCountryStatisticsService,
};
