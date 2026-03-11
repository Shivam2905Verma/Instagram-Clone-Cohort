const User = require("../models/auth.model");
const followModel = require("../models/follow.model");

async function followUser(req, res) {
  const followeeId = req.params.id;
  const followerId = req.user.id;

  if (followeeId === followerId) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const user = await User.findById(followeeId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const alreadyFollow = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (alreadyFollow) {
    return res.status(400).json({
      message: "You already follow this user",
    });
  }

  const followData = await followModel.create({
    follower: followerId,
    followee: followeeId,
  });

  await Promise.all([
    User.findByIdAndUpdate(followeeId, { $inc: { followers: 1 } }),
    User.findByIdAndUpdate(followerId, { $inc: { following: 1 } }),
  ]);

  res.status(200).json({
    message: "User followed successfully",
    followData,
  });
}

async function unfollowUser(req, res) {
  const followeeId = req.params.id;
  const followerId = req.user.id;

  const user = await User.findById(followeeId);

  if (!user) {
    return res.status(404).json({
      message: "The user you are trying to unfollow does not exist",
    });
  }

  const followExist = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (!followExist) {
    return res.status(400).json({
      message: "You are not following this user",
    });
  }

  await followModel.findByIdAndDelete(followExist._id);

  await Promise.all([
    User.findByIdAndUpdate(followeeId, { $inc: { followers: -1 } }),
    User.findByIdAndUpdate(followerId, { $inc: { following: -1 } }),
  ]);

  return res.status(200).json({
    message: `You unfollowed ${followeeId}`,
  });
}

async function isFollowed(req, res) {
  const followeeId = req.params.id;
  const followerId = req.user.id;

  const followExist = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  return res.status(200).json({
    isFollow: !!followExist,
  });
}

module.exports = { followUser, unfollowUser, isFollowed };
