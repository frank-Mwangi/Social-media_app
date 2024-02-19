import { Router } from "express";
import {
  createGroupMember,
  deleteGroupMember,
  getGroupMembers,
  getGroupMembersByID,
  getGroupsByMemberID,
} from "../controllers/groupMemberController.js";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

const groupMemberRouter = Router();

groupMemberRouter.get("/groups", authMiddleware, getGroupMembers);
groupMemberRouter.get("/groups/:id", authMiddleware, getGroupMembersByID);
groupMemberRouter.get("/:id/groups", authMiddleware, getGroupsByMemberID);
groupMemberRouter.post("/groupmembers", authMiddleware, createGroupMember);
groupMemberRouter.delete(
  "/groups/:groupid/:memberid",
  authMiddleware,
  deleteGroupMember
);

export default groupMemberRouter;
