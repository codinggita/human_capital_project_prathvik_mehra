const { z } = require("zod");

const validateCreateIndicator = z.object({
  body: z.object({
    indicatorCode: z
      .string()
      .min(2, "Indicator code is required")
      .toUpperCase(),
    indicatorName: z.string().min(3, "Indicator name is required"),
    description: z.string().optional(),
    category: z.string().optional(),
  }),
});

const validateUpdateIndicator = z.object({
  body: z.object({
    indicatorCode: z.string().min(2).toUpperCase().optional(),
    indicatorName: z.string().min(3).optional(),
    description: z.string().optional(),
    category: z.string().optional(),
  }),
});

module.exports = { validateCreateIndicator, validateUpdateIndicator };
