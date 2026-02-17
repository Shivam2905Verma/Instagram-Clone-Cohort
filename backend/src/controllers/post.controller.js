const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const Post = require("../models/post.model");

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
    const decoded = req.user;
}

async function getParticularPost(req, res) {
    const decoded = req.user;
}

module.exports = { createPost, getAllPost, getParticularPost };
