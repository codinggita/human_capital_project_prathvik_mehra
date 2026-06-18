const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("./src/models/user.model");
const bcrypt = require("bcryptjs");

dotenv.config({ path: path.join(__dirname, ".env") });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_MONGODB_URI || process.env.MONGODB_URI);
    
    const email = "admin@example.com";
    const password = "admin123";
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name: "Admin",
        email,
        password, // The Mongoose schema will probably hash this pre-save
        role: "admin"
      });
      await user.save();
      console.log("Admin created via Mongoose.");
    } else {
      user.password = password; // pre-save hook should re-hash
      user.role = "admin";
      await user.save();
      console.log("Admin password updated via Mongoose.");
    }

    console.log("Admin Email:", email);
    console.log("Admin Password:", password);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedAdmin();
