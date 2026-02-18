const mongoose = require("mongoose");

const likePostSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "posts",
      required: [true, "post id is required to like a post"],
    },

    user: {
      type: String,
      required: [true, "username is required to like a post"],
    },
  },
  { timestamps: true },
);

likePostSchema.index({ post: 1, user: 1 }, { unique: true });

const postLikeModel = mongoose.model("postlike", likePostSchema);

module.exports = postLikeModel;
