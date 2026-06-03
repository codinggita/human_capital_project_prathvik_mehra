// Generate a highly secure random numeric OTP string for 2FA or Password resets
const generateOTP = (length = 6) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    // Math.random is acceptable for basic OTPs.
    // In strict banking applications, crypto.randomInt from Node's native 'crypto' module is preferred.
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};

module.exports = { generateOTP };
