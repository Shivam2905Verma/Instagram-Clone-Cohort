const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const Post = require("../models/post.model");
const postLikeModel = require("../models/postLike.model");

const imagekit = new ImageKit({
  privateKey: "private_JYI8xVvlj55S3q4p/YCfBUJ+rm0=",
});

async function createPost(req, res) {
  const decoded = req.user;

  const { caption, date } = req.body;

  let imageURL = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "testFilename",
  });

  const post = await Post.create({
    caption,
    imageUrl: imageURL.url,
    user: decoded.id,
    date,
  });

  res.status(200).json({
    message: "Post created successfully",
    post,
  });
}

async function getAllPost(req, res) {
  const userId = req.user.id;

  const posts = await Post.find({
    user: userId,
  });

  res.status(200).json({
    message: "Posts fetched successfully.",
    posts,
  });
}

async function getParticularPost(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content.",
    });
  }

  return res.status(200).json({
    message: "Post fetched  successfully.",
    post,
  });
}

async function likePost(req, res) {
  const user = req.user;
  const postId = req.params.postId;

  const isPostExist = await Post.findById(postId);

  
  if (!isPostExist) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }
  const postAlreadyLike = await postLikeModel.findOne({
    post: postId,
    user: user.username,
  })
  
  if(postAlreadyLike){
    return res.status(200).json({
      message: "Post is already liked",
    });
  }

  const likedPost = await postLikeModel.create({
    post: postId,
    user: user.username,
  });

  return res.status(200).json({
    message: "Post is liked",
    likedPost,
  });
}

module.exports = { createPost, getAllPost, getParticularPost, likePost };
