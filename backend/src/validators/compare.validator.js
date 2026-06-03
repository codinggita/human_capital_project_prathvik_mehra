const { z } = require("zod");

const validateCompareCountries = z.object({
  query: z.object({
    country1: z
      .string()
      .length(3, "Country1 code must be exactly 3 characters"),
    country2: z
      .string()
      .length(3, "Country2 code must be exactly 3 characters"),
  }),
});

const validateCompareYears = z.object({
  query: z.object({
    year1: z.string().regex(/^\d{4}$/, "Year1 must be a valid 4-digit year"),
    year2: z.string().regex(/^\d{4}$/, "Year2 must be a valid 4-digit year"),
  }),
});

module.exports = { validateCompareCountries, validateCompareYears };
