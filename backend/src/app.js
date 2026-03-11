require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const followRouter = require("./routes/follow.route");
const handleError= require("./middleware/error.middleware");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", followRouter);
// app.use(handleError);

module.exports = app;
