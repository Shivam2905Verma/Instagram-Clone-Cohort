const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required to register a user"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required to register a user"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required to register a user"],
  },
  bio: {
    type: String,
  },
  profile_image: {
    type: String,
    default:
      "https://ik.imagekit.io/heySomthing/default%20progilepic.png?updatedAt=1770798500967",
  },
});

const User = mongoose.model("user", authSchema);

module.exports = User;
