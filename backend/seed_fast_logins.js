const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("./src/models/user.model");

dotenv.config({ path: path.join(__dirname, ".env") });

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_MONGODB_URI || process.env.MONGODB_URI);
    
    const usersToSeed = [
      { email: "admin@hcproject.com", password: "password123", role: "admin", name: "System Admin" },
      { email: "guest@hcproject.com", password: "password123", role: "user", name: "Guest User" }
    ];

    for (const u of usersToSeed) {
      let user = await User.findOne({ email: u.email });
      if (!user) {
        user = new User(u);
        await user.save();
        console.log(`Created: ${u.email}`);
      } else {
        user.password = u.password;
        user.role = u.role;
        await user.save();
        console.log(`Updated: ${u.email}`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedUsers();
