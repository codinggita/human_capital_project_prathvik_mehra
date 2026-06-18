const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const User = require("../models/user.model");

const getAllUsers = asyncHandler(async (req, res) => {
  let query = User.find();

  // Dynamic RBAC: If user is an admin, select the password hash field
  if (req.user && req.user.role === 'admin') {
    query = query.select('+password');
  } else {
    // Normal users only see name, email, role, avatar
    query = query.select('name email role avatar createdAt');
  }

  const users = await query.lean();

  return successResponse(
    res,
    200,
    "Users fetched successfully",
    users
  );
});

const updateMe = asyncHandler(async (req, res) => {
  // 1. Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return res.status(400).json({
      success: false,
      message: "This route is not for password updates."
    });
  }

  // 2. Filter out unwanted fields that are not allowed to be updated
  const filteredBody = {};
  const allowedFields = ['name', 'email', 'company', 'role', 'avatar'];
  Object.keys(req.body).forEach(el => {
    if (allowedFields.includes(el)) filteredBody[el] = req.body[el];
  });

  // 3. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  return successResponse(res, 200, "Profile updated successfully", updatedUser);
});

module.exports = {
  getAllUsers,
  updateMe
};
