import mongoose from "mongoose";

console.log("Connecting to MongoDB...");
mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@synchubcluster.gjgsg7v.mongodb.net/?retryWrites=true&w=majority`);
console.log("Connected to MongoDB");

const models = {};

const showSchema = new mongoose.Schema({
    title: String,
    img: String
});

models.show = mongoose.model("show", showSchema);

export default models;