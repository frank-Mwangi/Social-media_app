import { Router } from "express";
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
} from "../controllers/groupController.js";

const groupRoutes = Router();

groupRoutes.get("/groups", getGroups);
groupRoutes.get("/groups/:id", getGroupById);
groupRoutes.post("/groups", createGroup);
groupRoutes.put("/groups/:id", updateGroup);
groupRoutes.delete("/groups/:id", deleteGroup);
export default groupRoutes;
