const express = require("express");
const identifyUser = require("../middleware/identifyUser");
const {
  followUser,
  unfollowUser,
} = require("../controllers/follow.controller");

const followRouter = express.Router();

followRouter.post("/follow/:username", identifyUser, followUser);
followRouter.post("/unfollow/:username", identifyUser, unfollowUser);

module.exports = followRouter;
