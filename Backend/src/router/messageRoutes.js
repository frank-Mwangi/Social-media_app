import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
  getMessagesById,
  updateMessage,
} from "../controllers/messageController.js";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

const messageRouter = Router();

messageRouter.get("/messages", authMiddleware, getMessages);
messageRouter.get("/messages/:id", authMiddleware, getMessagesById);
messageRouter.post("/messages", authMiddleware, createMessage);
messageRouter.put("/messages/:id", authMiddleware, updateMessage);
messageRouter.delete("messages/:id", authMiddleware, deleteMessage);

export default messageRouter;
