import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri);
  console.log("[mongodb] connected");

  mongoose.connection.on("error", (err) => {
    console.error("[mongodb] connection error:", err);
  });
}
