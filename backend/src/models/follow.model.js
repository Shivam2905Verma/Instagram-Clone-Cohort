const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    followee: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "rejected", "accepted"],
        message: "Status can be rejected pending or accepted",
      },
    },
  },
  { timestamps: true },
);

followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel;
