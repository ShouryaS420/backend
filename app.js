import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors';
import Register from './routers/Register.js';
import Group from './routers/Group.js';
import Messages from './routers/Messages.js';
import Post from './routers/Post.js';
import PostVideo from './routers/PostVideo.js';
import Comment from './routers/Comment.js';
import Notification from './routers/Notification.js';

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api/register', Register);
app.use('/api/group', Group);
app.use('/api/message', Messages);
app.use('/api/post', Post);
app.use('/api/postVideo', PostVideo);
app.use('/api/comments', Comment);
app.use('/api/notification', Notification);

// Default route
app.get('/', (req, res) => {
  res.send('Server is working');
});
