const Indicator = require("../models/indicator.model");
const { buildQuery, buildSort } = require("../utils/queryBuilder");
const { getPagination, getPaginationMeta } = require("../utils/pagination");

const getAllIndicatorsService = async (queryObj) => {
  const filter = buildQuery(queryObj);
  const sort = buildSort(queryObj);
  const { page, limit, skip } = getPagination(queryObj);

  const [data, totalDocs] = await Promise.all([
    Indicator.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Indicator.countDocuments(filter),
  ]);

  return { data, pagination: getPaginationMeta(totalDocs, page, limit) };
};

const createIndicatorService = async (data) => Indicator.create(data);

const getIndicatorByIdService = async (id) => {
  const indicator = await Indicator.findById(id).lean();
  if (!indicator) {
    const err = new Error("Indicator not found");
    err.statusCode = 404;
    throw err;
  }
  return indicator;
};

const updateIndicatorService = async (id, data) => {
  return Indicator.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteIndicatorService = async (id) => Indicator.findByIdAndDelete(id);

const getIndicatorSummaryService = async () => {
  // Group indicators by category using MongoDB aggregation pipeline
  return Indicator.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
};

module.exports = {
  getAllIndicators: getAllIndicatorsService,
  createIndicator: createIndicatorService,
  getIndicatorById: getIndicatorByIdService,
  updateIndicator: updateIndicatorService,
  deleteIndicator: deleteIndicatorService,
  getIndicatorSummary: getIndicatorSummaryService,
};
