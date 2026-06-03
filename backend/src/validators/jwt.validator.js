const { z } = require("zod");

const validateJWT = z.object({
  body: z.object({
    token: z.string().min(10, "A valid JWT token is required"),
  }),
});

const validateRefreshToken = z.object({
  body: z.object({
    token: z.string().min(10, "A valid refresh token is required"),
  }),
});

module.exports = { validateJWT, validateRefreshToken };
