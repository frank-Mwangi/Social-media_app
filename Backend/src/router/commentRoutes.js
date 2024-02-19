import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
  getCommentsById,
  getCommentsByPostId,
  updateComment,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

const commentRouter = Router();

commentRouter.get("/comments", authMiddleware, getComments);
commentRouter.get("/comments/:id", authMiddleware, getCommentsById);
commentRouter.get("/:id/comments", authMiddleware, getCommentsByPostId);
commentRouter.post("/comments", authMiddleware, createComment);
commentRouter.put("/comments/:id", authMiddleware, updateComment);
commentRouter.delete("/comments/:id", authMiddleware, deleteComment);

export default commentRouter;
