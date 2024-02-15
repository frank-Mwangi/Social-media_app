import { Router } from "express";
import logger from "../utils/logger.js";
import {
  createUser,
  getUsers,
  getUsersById,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/user", getUsers);
userRouter.get("/user/:id", getUsersById);
userRouter.post("/user/register", createUser);
// userRouter.post("/user/login", logger.info("User login goes here"));
// userRouter.get("/user/:id", logger.info("Navigate to profile"));
// userRouter.patch("/user/:id", logger.info("Edit profile"));
// userRouter.delete("/user/:id", logger.info("delete account"));

export default userRouter;
