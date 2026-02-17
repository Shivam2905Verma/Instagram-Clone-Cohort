const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getAllPost,
  getParticularPost,
} = require("../controllers/post.controller");

const multer = require("multer");
const identifyUser = require("../middleware/identifyUser");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("postImage"), identifyUser, createPost);
postRouter.post("/getAll", getAllPost);
postRouter.post("/post/:postId", getParticularPost);

module.exports = postRouter;
