const User = require("../models/auth.model");
const followModel = require("../models/follow.model");

async function followUser(req, res) {
  const followeeUsername = req.params.username;
  const followerUsername = req.user.username;

  const isUserExist = await User.findOne({
    username: followeeUsername,
  });

  if (!isUserExist) {
    return res.status(404).json({
      message: "The user you are trying to follow is not exist",
    });
  }

  if (followeeUsername === followerUsername) {
    return res.status(200).json({
      message: "You are trying to follow yourself",
    });
  }

  const alreadyFollow = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (alreadyFollow) {
    return res.status(200).json({
      message: "You have already follow this user",
    });
  }

  const followData = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(200).json({
    message: `You have followed ${followeeUsername}`,
    followData,
  });
}

async function unfollowUser(req, res) {
  const followeeUsername = req.params.username;
  const followerUsername = req.user.username;

  const isUserExist = await User.findOne({
    username: followeeUsername,
  });

  if (!isUserExist) {
    return res.status(404).json({
      message: "The user you are trying to unfollow is not exist",
    });
  }

  const followExist = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!followExist) {
    return res.status(200).json({
      message: "This user is already unfollowed",
    });
  }

  const deleteFollow = await followModel.findByIdAndDelete(followExist._id);
  return res.status(200).json({
    message: `You unfollow ${followeeUsername}`,
    deleteFollow,
  });
}

module.exports = { followUser, unfollowUser };
