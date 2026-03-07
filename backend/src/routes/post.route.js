const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getAllPost,
  getParticularPost,
  likePost,
  getAllFeed,
  unlikePost,
} = require("../controllers/post.controller");

const multer = require("multer");
const identifyUser = require("../middleware/identifyUser");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), identifyUser, createPost);
postRouter.get("/getAll", identifyUser, getAllPost);
postRouter.post("/postdetail/:postId", identifyUser, getParticularPost);
postRouter.post("/like/:postId", identifyUser, likePost);
postRouter.post("/unlike/:postId", identifyUser, unlikePost);
postRouter.get("/feed", identifyUser, getAllFeed);

module.exports = postRouter;
