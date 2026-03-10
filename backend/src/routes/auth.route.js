const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  updateUserProfile,
} = require("../controllers/auth.controller");
const identifyUser = require("../middleware/identifyUser");
const authRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/updateprofile", upload.single("profileImage"),  identifyUser, updateUserProfile);
authRouter.get("/get-me", identifyUser, getMe);

module.exports = authRouter;
