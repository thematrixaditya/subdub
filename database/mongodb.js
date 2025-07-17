import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error("Database URI is not defined in the environment variables. Please setup DB_URI in your .env.*.local file.");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`🚀 Connected to MongoDB in ${NODE_ENV} mode.`);
  } catch (error) {
    console.error("🥲 Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectToDatabase;
