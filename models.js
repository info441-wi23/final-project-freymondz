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
    showId: String
});

models.show = mongoose.model("show", showSchema);

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    picture: String,
});

models.user = mongoose.model("user", userSchema);

const reviewSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    username: String,
    showId: String,
    review: String,
    season: Number,
    eposide: Number,
})

models.review = mongoose.model("review", reviewSchema);
export default models;
