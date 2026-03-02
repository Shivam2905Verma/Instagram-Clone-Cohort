const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getAllPost,
  getParticularPost,
  likePost,
  getAllFeed,
} = require("../controllers/post.controller");

const multer = require("multer");
const identifyUser = require("../middleware/identifyUser");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("postImage"), identifyUser, createPost);
postRouter.get("/getAll", identifyUser, getAllPost);
postRouter.post("/postdetail/:postId", identifyUser, getParticularPost);
postRouter.post("/like/:postId", identifyUser, likePost);
postRouter.get("/feed", getAllFeed);

module.exports = postRouter;
