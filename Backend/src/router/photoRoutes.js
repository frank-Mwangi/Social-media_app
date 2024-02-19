import { Router } from "express";
import {
  createPhoto,
  deletePhoto,
  getPhotos,
  getPhotosById,
  updatePhoto,
} from "../controllers/photoController.js";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

const photoRouter = Router();

photoRouter.get("/photos", authMiddleware, getPhotos);
photoRouter.get("/photos/:id", authMiddleware, getPhotosById);
photoRouter.post("/photos", authMiddleware, createPhoto);
photoRouter.put("/photos/:id", authMiddleware, updatePhoto);
photoRouter.delete("/photos/:id", authMiddleware, deletePhoto);

export default photoRouter;
