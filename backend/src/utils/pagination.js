const { PAGINATION } = require("./constants");

// Calculate skip and limit for MongoDB queries dynamically
const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || PAGINATION.DEFAULT_PAGE);
  const limit = Math.max(
    1,
    parseInt(query.limit, 10) || PAGINATION.DEFAULT_LIMIT,
  );
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

// Generate pagination metadata perfectly for client frontend consumption
const getPaginationMeta = (totalDocs, page, limit) => {
  const totalPages = Math.ceil(totalDocs / limit);

  return {
    currentPage: page,
    limit,
    totalPages,
    totalRecords: totalDocs,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

module.exports = { getPagination, getPaginationMeta };
