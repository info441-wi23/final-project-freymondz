import mongoose from "mongoose";

console.log("Connecting to MongoDB...");
mongoose.set("strictQuery", false);
// mongoose.connect("mongodb+srv://");
console.log("Connected to MongoDB");

const models = {};

export default models;