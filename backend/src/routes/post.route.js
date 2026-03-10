const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getParticularPost,
  likePost,
  getAllFeed,
  unlikePost,
  getAllPostOfUser,
} = require("../controllers/post.controller");

const multer = require("multer");
const identifyUser = require("../middleware/identifyUser");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), identifyUser, createPost);
postRouter.get("/getAllPostOfUser", identifyUser, getAllPostOfUser);
postRouter.post("/postdetail/:postId", identifyUser, getParticularPost);
postRouter.post("/like/:postId", identifyUser, likePost);
postRouter.post("/unlike/:postId", identifyUser, unlikePost);
postRouter.get("/feed", identifyUser, getAllFeed);

module.exports = postRouter;
