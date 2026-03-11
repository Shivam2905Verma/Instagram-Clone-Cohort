const express = require("express");
const identifyUser = require("../middleware/identifyUser");
const {
  followUser,
  unfollowUser,
  isFollowed,
} = require("../controllers/follow.controller");

const followRouter = express.Router();

followRouter.post("/follow/:id", identifyUser, followUser);
followRouter.post("/unfollow/:id", identifyUser, unfollowUser);
followRouter.get("/isFollowed/:id", identifyUser, isFollowed);

module.exports = followRouter;
