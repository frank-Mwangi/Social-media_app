import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPostsById,
  updatePost,
} from "../controllers/postController.js";

const postRouter = Router();

postRouter.get("/posts", getPosts);
postRouter.get("/posts/:id", getPostsById);
postRouter.post("/posts", createPost);
postRouter.put("/posts/:id", updatePost);
postRouter.delete("/posts/:id", deletePost);

export default postRouter;
