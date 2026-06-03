/**
 * Protected Service
 * Handles business logic for authenticated user operations and activity logs
 */

/**
 * Fetch basic protected data for a user
 * @param {string} userId - ID of the authenticated user
 */
const getProtectedData = async (userId) => {
  return {
    userId,
    status: "authenticated",
    lastLogin: new Date().toISOString(),
    message: "This is sensitive data accessible only to you.",
  };
};

/**
 * Fetch mock activity logs for testing purposes
 * @param {string} userId - ID of the authenticated user
 * @param {object} query - Pagination and filter queries
 */
const getUserActivityLogs = async (userId, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 5;

  const logs = [
    {
      id: 1,
      action: "LOGIN",
      timestamp: new Date(Date.now() - 100000).toISOString(),
    },
    {
      id: 2,
      action: "FETCH_PRICES",
      timestamp: new Date(Date.now() - 50000).toISOString(),
    },
    { id: 3, action: "GENERATE_TOKEN", timestamp: new Date().toISOString() },
  ];

  return {
    data: logs,
    pagination: {
      total: logs.length,
      page,
      limit,
      totalPages: 1,
    },
  };
};

module.exports = {
  getProtectedData,
  getUserActivityLogs,
};
