const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: [true, "image is required for making a post"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
