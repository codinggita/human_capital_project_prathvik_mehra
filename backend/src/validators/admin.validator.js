const { z } = require("zod");

const validateAdminAction = z.object({
  body: z.object({
    action: z.enum(["approve", "reject", "suspend", "verify"], {
      errorMap: () => ({ message: "Invalid admin action provided" }),
    }),
    targetId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Valid target MongoDB ID is required"),
    reason: z.string().optional(),
  }),
});

module.exports = { validateAdminAction };
