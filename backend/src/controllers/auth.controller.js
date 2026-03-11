const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: "private_JYI8xVvlj55S3q4p/YCfBUJ+rm0=",
});

async function registerUser(req, res) {
  const { email, username, password, bio, profileImage } = req.body;

  const isExisted = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (isExisted) {
    return res.status(409).json({
      message: "User is already registerd with these credentials",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    messgae: "user is registered successfully",
  });
}

async function loginUser(req, res) {
  const { email, username, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    return res.status(404).json({
      message: email ? "Email is not registered" : "username is not registered",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password invalid",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User loggedIn successfully.",
    user: {
      _id: user._id,
      bio: user.bio,
      email: user.email,
      username: user.username,
      profile_image: user.profile_image,
    },
  });
}

async function updateUserProfile(req, res) {
  const id = req.user.id;
  const { username, bio } = req.body;

  const updateData = { username, bio };

  if (req.file) {
    const imageURL = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "testFilename",
    });
    updateData.profile_image = imageURL.url;
  }

  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  }).select("-password");

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user prfile is successfully updated",
    user,
  });
}

async function getMe(req, res) {
  const userData = await User.findOne({ username: req.user.username })
    .select("-password")
    .lean();

  res.status(200).json({
    message: "user is authorized",
    user: userData,
  });
}

async function getUserProfileData(req, res) {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User profile fetched successfully",
    user,
  });
}

module.exports = { registerUser, loginUser, getMe, updateUserProfile , getUserProfileData};
