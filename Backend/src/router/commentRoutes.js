import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
  getCommentsById,
  getCommentsByPostId,
  updateComment,
} from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.get("/comments", getComments);
commentRouter.get("/comments/:id", getCommentsById);
commentRouter.get("/:id/comments", getCommentsByPostId);
commentRouter.post("/comments", createComment);
commentRouter.put("/comments/:id", updateComment);
commentRouter.delete("/comments/:id", deleteComment);

export default commentRouter;
