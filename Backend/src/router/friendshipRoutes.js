import { Router } from "express";
import {
  createFriendship,
  deleteFriendship,
  getAllFriendsOfAUser,
  getFriendshipById,
  getFriendships,
} from "../controllers/friendshipController.js";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

const friendshipRouter = Router();

friendshipRouter.get("/friendships", authMiddleware, getFriendships);
friendshipRouter.get("/friendships/:id", authMiddleware, getFriendshipById);
friendshipRouter.get("/friends/:id", authMiddleware, getAllFriendsOfAUser);
friendshipRouter.post("/friendships", authMiddleware, createFriendship);
friendshipRouter.delete("/friendships/:id", authMiddleware, deleteFriendship);

export default friendshipRouter;
