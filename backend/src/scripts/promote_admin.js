const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/user.model");

// Load env from root
dotenv.config({ path: path.join(__dirname, "../../.env") });

const promoteToAdmin = async (email) => {
  try {
    await mongoose.connect(
      process.env.LOCAL_MONGODB_URI || process.env.MONGODB_URI,
    );

    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true },
    );

    if (!user) {
      console.log("❌ User not found");
    } else {
      console.log(`✅ User ${user.email} promoted to ADMIN successfully`);
    }

    process.exit(0);
  } catch (error) {
    console.error("💥 Error:", error.message);
    process.exit(1);
  }
};

// Get email from command line argument
const email = process.argv[2];
if (!email) {
  console.log(
    "Please provide an email: node src/scripts/promote_admin.js user@example.com",
  );
  process.exit(1);
}

promoteToAdmin(email);
