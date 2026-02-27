const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_image: user.profile_image,
    },
  });
}

async function getMe(req, res) {
  res.status(200).json({
    message: "user is authorized",
  });
}

module.exports = { registerUser, loginUser, getMe };
