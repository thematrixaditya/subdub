import User from "../models/user.model.js";

// get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    const response = { success: true, message: "Users retrieved successfully", data: users };
    console.log("Users retrieved successfully: ", response);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving users:", error);
    next(error);
  }
};

// get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const response = { success: true, message: "User retrieved successfully", data: user };
    console.log("User retrieved successfully: ", response);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving user:", error);
    next(error);
  }
};