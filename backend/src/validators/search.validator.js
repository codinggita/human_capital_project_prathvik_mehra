const { z } = require("zod");

// Base pagination query shape to keep code DRY
const paginationQueryShape = {
  page: z
    .string()
    .regex(/^\d+$/, "Page must be a valid positive integer")
    .optional(),
  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a valid positive integer")
    .optional(),
};

// Validate pagination query parameters
const validatePaginationQuery = z.object({
  query: z.object(paginationQueryShape).passthrough(),
});

const validateSortQuery = z.object({
  query: z
    .object({
      sort: z.string().min(1, "Sort parameter cannot be empty").optional(),
    })
    .extend(paginationQueryShape)
    .passthrough(),
});

const validateFilterQuery = z.object({
  query: z
    .object({
      country: z.string().optional(),
      year: z
        .string()
        .regex(/^\d{4}$/)
        .optional(),
      month: z
        .string()
        .regex(/^(1[0-2]|[1-9])$/)
        .optional(),
      indicator: z.string().optional(),
      frequency: z.string().max(1).optional(),
      minValue: z
        .string()
        .regex(/^\d+(\.\d+)?$/)
        .optional(),
      maxValue: z
        .string()
        .regex(/^\d+(\.\d+)?$/)
        .optional(),
    })
    .extend(paginationQueryShape)
    .passthrough(),
});

const validateSearchQuery = z.object({
  query: z
    .object({
      search: z.string().min(1, "Search query cannot be empty").optional(),
      contains: z.string().optional(),
    })
    .extend(validateFilterQuery.shape.query.shape)
    .passthrough(),
});

module.exports = {
  validateSearchQuery,
  validatePaginationQuery,
  validateSortQuery,
  validateFilterQuery,
};
