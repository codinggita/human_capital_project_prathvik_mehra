const { z } = require("zod");

const validateCreatePrice = z.object({
  body: z.object({
    frequency: z.string().min(1, "Frequency is required").max(1),
    countryCode: z
      .string()
      .length(3, "Country code must be exactly 3 characters"),
    countryName: z.string().min(1, "Country name is required"),
    indicatorCode: z.string().min(1, "Indicator code is required"),
    indicatorName: z.string().optional(),
    value: z
      .number({
        required_error: "Price value is required",
        invalid_type_error: "Value must be a number",
      })
      .nullable(),
    year: z
      .number()
      .int()
      .min(1900, "Year must be valid")
      .max(new Date().getFullYear() + 1),
    // Ensure month value stays between 1 and 12
    month: z
      .number()
      .int()
      .min(1, "Month must be between 1 and 12")
      .max(12)
      .nullable()
      .optional(),
  }),
});

// Update schema makes all fields optional to allow partial updates
const validateUpdatePrice = z.object({
  body: z.object({
    frequency: z.string().max(1).optional(),
    countryCode: z.string().length(3).optional(),
    countryName: z.string().optional(),
    indicatorCode: z.string().optional(),
    indicatorName: z.string().optional(),
    value: z.number().nullable().optional(),
    year: z
      .number()
      .int()
      .min(1900)
      .max(new Date().getFullYear() + 1)
      .optional(),
    month: z.number().int().min(1).max(12).nullable().optional(),
  }),
});

// Replace requires complete object payload
const validateReplacePrice = validateCreatePrice;

// Validate API query parameters for safe database lookup
const validatePriceQuery = z.object({
  query: z
    .object({
      country: z.string().optional(),
      year: z
        .string()
        .regex(/^\d{4}$/, "Year must be a 4-digit number")
        .optional(),
      month: z
        .string()
        .regex(/^(1[0-2]|[1-9])$/, "Month must be 1-12")
        .optional(),
      indicator: z.string().optional(),
      frequency: z.string().max(1).optional(),
      page: z.string().regex(/^\d+$/).optional(),
      limit: z.string().regex(/^\d+$/).optional(),
    })
    .passthrough(),
});

module.exports = {
  validateCreatePrice,
  validateUpdatePrice,
  validateReplacePrice,
  validatePriceQuery,
};
