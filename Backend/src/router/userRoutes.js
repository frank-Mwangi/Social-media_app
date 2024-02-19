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

const userRouter = Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/users/auth/login", loginUser);
userRouter.get("/user", getUsers);
userRouter.get("/user/:id", getUsersById);
// userRouter.post("/users", createUser);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
