import { Router } from "express";
import {
  createFriendship,
  deleteFriendship,
  getAllFriendsOfAUser,
  getFriendshipById,
  getFriendships,
} from "../controllers/friendshipController.js";

const friendshipRouter = Router();

friendshipRouter.get("/friendships", getFriendships);
friendshipRouter.get("/friendships/:id", getFriendshipById);
friendshipRouter.get("/friends/:id", getAllFriendsOfAUser);
friendshipRouter.post("/friendships", createFriendship);
friendshipRouter.delete("/friendships/:id", deleteFriendship);

export default friendshipRouter;
