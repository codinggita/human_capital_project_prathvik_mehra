const { z } = require("zod");

const validateGenerateReport = z.object({
  body: z.object({
    reportName: z
      .string()
      .min(3, "Report name is required and must be at least 3 characters"),
    filters: z.record(z.any()).optional(),
    format: z.enum(["json", "csv", "pdf"]).default("json"),
    includeCharts: z.boolean().default(false),
  }),
});

module.exports = { validateGenerateReport };
