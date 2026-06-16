import { app } from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("✅ MongoDB connected");

    app.listen(port, () => {
      console.log(`🚀 Server started on port ${port}`);
    });

  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();