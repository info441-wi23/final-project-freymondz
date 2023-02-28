import mongoose from "mongoose";

console.log("Connecting to MongoDB...");
mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@synchubcluster.gjgsg7v.mongodb.net/?retryWrites=true&w=majority`);
console.log("Connected to MongoDB");

const models = {};

//add show id to be the same as imdb api id
const showSchema = new mongoose.Schema({
    title: String,
    img: String,
    showId: Number
});

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    picture: String,
});

models.show = mongoose.model("show", showSchema);

models.user = mongoose.model("user", userSchema);

const reviewSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    showID: {type: mongoose.Schema.Types.ObjectId, ref: "show"},
    username: String,
    showname: String,
    review: String
})

models.review = mongoose.model("review", reviewSchema)
export default models;
