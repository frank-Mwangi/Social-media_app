import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
  getMessagesById,
  updateMessage,
} from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/messages", getMessages);
messageRouter.get("/messages/:id", getMessagesById);
messageRouter.post("/messages", createMessage);
messageRouter.put("/messages/:id", updateMessage);
messageRouter.delete("messages/:id", deleteMessage);

export default messageRouter;
