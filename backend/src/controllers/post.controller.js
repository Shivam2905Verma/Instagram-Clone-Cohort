const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const Post = require("../models/post.model");
const postLikeModel = require("../models/postLike.model");
const User = require("../models/auth.model");

const imagekit = new ImageKit({
  privateKey: "private_JYI8xVvlj55S3q4p/YCfBUJ+rm0=",
});

async function createPost(req, res) {
  const { id } = req.user;
  const { caption } = req.body;

  if (!req.file) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

  const imageUpload = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: `${Date.now()}-${req.file.originalname}`,
  });

  const post = await Post.create({
    caption,
    imageUrl: imageUpload.url,
    user: id,
  });

  await post.populate("user");

  await User.findByIdAndUpdate(id, {
    $inc: { numberOfPosts: 1 },
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getAllPostOfUser(req, res) {
  const userId = req.params.id;

  if (!userId) {
    return res.status(401).json({
      message: "This user is not exist",
    });
  }

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
  });

  if (postAlreadyLike) {
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
async function unlikePost(req, res) {
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
  });

  if (!postAlreadyLike) {
    return res.status(200).json({
      message: "Post is already unliked",
    });
  }

  const likedPost = await postLikeModel.findByIdAndDelete(postAlreadyLike._id);

  return res.status(200).json({
    message: "Post is unliked",
    likedPost,
  });
}

async function getAllFeed(req, res) {
  const user = req.user;

  try {
    const feed = await Promise.all(
      (
        await Post.find({})
          .sort({ _id: -1 })
          .populate("user", "-password")
          .lean()
      ).map(async (post) => {
        const isLiked = await postLikeModel.findOne({
          user: user.username,
          post: post._id,
        });

        post.isLiked = Boolean(isLiked);

        return post;
      }),
    );

    res.status(200).json({
      message: "posts fetched successfully.",
      feed,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createPost,
  getAllPostOfUser,
  getParticularPost,
  likePost,
  unlikePost,
  getAllFeed,
};
