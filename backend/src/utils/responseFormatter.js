// Standardize all API success responses universally
const successResponse = (
  res,
  statusCode,
  message,
  data = null,
  pagination = null,
) => {
  const response = {
    success: true,
    message,
  };

  if (data) response.data = data;
  if (pagination) response.pagination = pagination;

  return res.status(statusCode).json(response);
};

// Standardize all API error responses universally
const errorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors) response.errors = errors;

  return res.status(statusCode).json(response);
};

// Shortcut specifically for paginated list responses
const paginatedResponse = (res, statusCode, message, data, pagination) => {
  return successResponse(res, statusCode, message, data, pagination);
};

module.exports = { successResponse, errorResponse, paginatedResponse };
