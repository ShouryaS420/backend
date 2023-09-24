import express from "express";
import Register from "./routers/Register.js";
import Group from "./routers/Group.js";
import Messages from "./routers/Messages.js";
import Post from "./routers/Post.js";
import PostVideo from "./routers/PostVideo.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/register", Register);
app.use("/api/group", Group);
app.use("/api/message", Messages);
app.use("/api/post", Post);
app.use("/api/postVideo", PostVideo);

app.get("/", (req, res) => {
  res.send("Server is working");
  console.log("Some Changes");
});
