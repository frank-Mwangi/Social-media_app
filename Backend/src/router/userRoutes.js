import { Router } from "express";
import {
  // createUser,
  deleteUser,
  getUsers,
  getUsersById,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

const userRouter = Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/users/auth/login", loginUser);
userRouter.get("/user", authMiddleware, getUsers);
userRouter.get("/user/:id", authMiddleware, getUsersById);
// userRouter.post("/users", createUser);
userRouter.put("/users/:id", authMiddleware, updateUser);
userRouter.delete("/users/:id", authMiddleware, deleteUser);

export default userRouter;
