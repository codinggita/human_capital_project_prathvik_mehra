// Centralize application-wide strict strings to prevent typos across backend
const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

const FREQUENCIES = {
  MONTHLY: "M",
  ANNUALLY: "A",
  QUARTERLY: "Q",
};

const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

module.exports = { ROLES, FREQUENCIES, PAGINATION };
