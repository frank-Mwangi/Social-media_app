import { Router } from "express";
import {
  getMessages,
  getMessagesById,
} from "../controllers/messageController.js";

const messageRoutes = Router();

messageRoutes.get("/messages", getMessages);
messageRoutes.get("/messages/:id", getMessagesById);

export default messageRoutes;
