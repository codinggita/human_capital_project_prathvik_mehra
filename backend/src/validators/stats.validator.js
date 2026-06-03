const { z } = require("zod");

// Validate query parameters meant for heavy aggregation operations safely
const validateStatisticsQuery = z.object({
  query: z
    .object({
      year: z
        .string()
        .regex(/^\d{4}$/, "Invalid year format")
        .optional(),
      month: z
        .string()
        .regex(/^(1[0-2]|[1-9])$/, "Invalid month format")
        .optional(),
      countryCode: z
        .string()
        .length(3, "Country code must be exactly 3 characters")
        .optional(),
      indicator: z.string().optional(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
    })
    .passthrough(),
});

module.exports = { validateStatisticsQuery };
