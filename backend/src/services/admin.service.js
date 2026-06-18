const User = require("../models/user.model");
const Price = require("../models/price.model");
const { getPagination, getPaginationMeta } = require("../utils/pagination");

const getAdminDashboardService = async () => {
  // Use estimatedDocumentCount for instant results on 190k records
  const [totalUsers, totalPrices] = await Promise.all([
    User.countDocuments(),
    Price.estimatedDocumentCount(),
  ]);
  return { totalUsers, totalPrices, status: "Healthy" };
};

const getAdminStatisticsService = async () => {
  return { message: "Admin detailed stats generated here" };
};

const getAllUsersService = async (queryObj) => {
  const { page, limit, skip } = getPagination(queryObj);
  const [data, totalDocs] = await Promise.all([
    User.find().skip(skip).limit(limit).lean(),
    User.countDocuments(),
  ]);
  return { data, pagination: getPaginationMeta(totalDocs, page, limit) };
};

const getUserByIdService = async (id) => User.findById(id).lean();
const updateUserRoleService = async (id, role) =>
  User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });
const deleteUserService = async (id) => User.findByIdAndDelete(id);

const adminCreatePriceService = async (data) => Price.create(data);
const adminUpdatePriceService = async (id, data) =>
  Price.findByIdAndUpdate(id, data, { new: true });
const adminDeletePriceService = async (id) => Price.findByIdAndDelete(id);

const getAllPricesService = async (queryObj) => {
  const { page, limit, skip } = getPagination(queryObj);
  const filter = {};
  if (queryObj.country) {
    // case-insensitive exact or partial match
    filter.countryCode = { $regex: new RegExp(`^${queryObj.country}$`, 'i') }; 
  }

  const [data, totalDocs] = await Promise.all([
    Price.find(filter).skip(skip).limit(limit).lean(),
    Object.keys(filter).length === 0 ? Price.estimatedDocumentCount() : Price.countDocuments(filter),
  ]);
  return { data, pagination: getPaginationMeta(totalDocs, page, limit) };
};

module.exports = {
  getAdminDashboard: getAdminDashboardService,
  getAdminAnalytics: getAdminStatisticsService,
  getAdminStatistics: getAdminStatisticsService,
  getAllUsers: getAllUsersService,
  getUserById: getUserByIdService,
  updateUserRole: updateUserRoleService,
  deleteUser: deleteUserService,
  getAllPrices: getAllPricesService,
  createPrice: adminCreatePriceService,
  updatePrice: adminUpdatePriceService,
  deletePrice: adminDeletePriceService,
};
