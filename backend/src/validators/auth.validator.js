const { z } = require("zod");

// Validate secure password format centrally
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const validateRegister = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50),
    email: z.string().email("Valid email is required"),
    password: passwordSchema,
  }),
});

const validateLogin = z.object({
  body: z.object({
    email: z.string().email("Valid email is required"),
    password: z.string().min(1, "Password is required"),
  }),
});

const validateForgotPassword = z.object({
  body: z.object({
    email: z.string().email("Valid email is required"),
  }),
});

const validateResetPassword = z.object({
  body: z.object({
    token: z.string().min(1, "Reset token is required"),
    newPassword: passwordSchema,
  }),
});

const validateChangePassword = z.object({
  body: z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: passwordSchema,
  }),
});

const validateSendOTP = z.object({
  body: z.object({
    email: z.string().email("Valid email is required"),
  }),
});

const validateVerifyOTP = z.object({
  body: z.object({
    email: z.string().email("Valid email is required"),
    otp: z
      .string()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^\d+$/, "OTP must contain only numbers"),
  }),
});

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
  validateSendOTP,
  validateVerifyOTP,
};
