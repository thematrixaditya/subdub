import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "../config/env.js";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUsers = await User.create([{
      name: name,
      email: email,
      password: hashedPassword,
    }], { session });

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    await session.commitTransaction();

    const response = { success: true, message: "User created successfully", data: { user: newUsers[0], token } };
    console.log("User created successfully: ", response);

    res.status(201).json(response);
  } catch (error) {
    console.error("Error during sign up:", error);

    next(error);

    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("User not found with this email");
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    const response = { success: true, message: "User signed in successfully", data: { user, token } };
    console.log("User signed in successfully: ", response);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error during sign in:", error);
    next(error);
  }
};

export const signOut = async (req, res, next) => { };