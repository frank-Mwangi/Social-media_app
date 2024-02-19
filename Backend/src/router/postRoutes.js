import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPostsById,
  updatePost,
} from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

const postRouter = Router();

postRouter.get("/posts", authMiddleware, getPosts);
postRouter.get("/posts/:id", authMiddleware, getPostsById);
postRouter.post("/posts", authMiddleware, createPost);
postRouter.put("/posts/:id", authMiddleware, updatePost);
postRouter.delete("/posts/:id", authMiddleware, deletePost);

export default postRouter;
