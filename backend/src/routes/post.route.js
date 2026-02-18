const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getAllPost,
  getParticularPost,
  likePost,
} = require("../controllers/post.controller");

const multer = require("multer");
const identifyUser = require("../middleware/identifyUser");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("postImage"), identifyUser, createPost);
postRouter.post("/getAll", getAllPost);
postRouter.post("/postdetail/:postId", getParticularPost);
postRouter.post("/like/:postId", identifyUser, likePost);

module.exports = postRouter;
