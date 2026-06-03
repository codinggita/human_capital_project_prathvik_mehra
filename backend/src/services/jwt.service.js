const jwt = require("jsonwebtoken");

const generateJWTTokenService = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
  return { data: payload, token };
};

const verifyJWTTokenService = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const refreshJWTTokenService = async (token) => {
  // Verifying the old refresh token signature
  const decoded = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
  );

  // Issuing a fresh access token
  const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return { token: newToken };
};

const getProfileDataService = async (userId) => {
  return { userId, profile: "Profile Data" };
};
const getDashboardDataService = async (userId) => {
  return { userId, dashboard: "Dashboard Data" };
};
const getAdminDataService = async (userId) => {
  return { userId, admin: true };
};
const getUserDataService = async (userId) => {
  return { userId, user: true };
};
const verifyAdminRoleService = async (userId) => {
  return { verified: true, role: "admin" };
};
const verifyUserRoleService = async (userId) => {
  return { verified: true, role: "user" };
};

module.exports = {
  generateToken: generateJWTTokenService,
  verifyToken: verifyJWTTokenService,
  refreshToken: refreshJWTTokenService,
  getProfileData: getProfileDataService,
  getDashboardData: getDashboardDataService,
  getAdminData: getAdminDataService,
  getUserData: getUserDataService,
  verifyAdminRole: verifyAdminRoleService,
  verifyUserRole: verifyUserRoleService,
};
