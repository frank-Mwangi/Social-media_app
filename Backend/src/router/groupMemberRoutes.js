import { Router } from "express";
import {
  createGroupMember,
  deleteGroupMember,
  getGroupMembers,
  getGroupMembersByID,
  getGroupsByMemberID,
} from "../controllers/groupMemberController";

const groupMemberRouter = Router();

groupMemberRouter.get("/groups", getGroupMembers);
groupMemberRouter.get("/groups/:id", getGroupMembersByID);
groupMemberRouter.get("/:id/groups", getGroupsByMemberID);
groupMemberRouter.post("/groupmembers", createGroupMember);
groupMemberRouter.delete("/groups/:groupid/:memberid", deleteGroupMember);

export default groupMemberRouter;
