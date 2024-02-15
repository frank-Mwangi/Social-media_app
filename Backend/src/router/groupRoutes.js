import { Router } from "express";
import { getGroupById, getGroups } from "../controllers/groupController.js";

const groupRoutes = Router();

groupRoutes.get("/groups", getGroups);
groupRoutes.get("/groups/:id", getGroupById);

export default groupRoutes;
