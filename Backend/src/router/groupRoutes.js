import { Router } from "express";
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
} from "../controllers/groupController.js";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

const groupRoutes = Router();

groupRoutes.get("/groups", authMiddleware, getGroups);
groupRoutes.get("/groups/:id", authMiddleware, getGroupById);
groupRoutes.post("/groups", authMiddleware, createGroup);
groupRoutes.put("/groups/:id", authMiddleware, updateGroup);
groupRoutes.delete("/groups/:id", authMiddleware, deleteGroup);
export default groupRoutes;
