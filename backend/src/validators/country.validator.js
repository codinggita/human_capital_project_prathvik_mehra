const { z } = require("zod");

const validateCreateCountry = z.object({
  body: z.object({
    countryCode: z
      .string()
      .length(3, "Country code must be exactly 3 characters")
      .toUpperCase(),
    countryName: z.string().min(2, "Country name is required"),
    region: z.string().optional(),
    currency: z
      .string()
      .length(3, "Currency code must be exactly 3 characters")
      .optional(),
  }),
});

const validateUpdateCountry = z.object({
  body: z.object({
    countryCode: z.string().length(3).toUpperCase().optional(),
    countryName: z.string().min(2).optional(),
    region: z.string().optional(),
    currency: z.string().length(3).optional(),
  }),
});

module.exports = { validateCreateCountry, validateUpdateCountry };
