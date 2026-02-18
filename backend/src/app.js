require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const followRouter = require("./routes/follow.route");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", followRouter);

module.exports = app;
