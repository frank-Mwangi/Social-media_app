import { Router } from "express";
import {
  createPhoto,
  deletePhoto,
  getPhotos,
  getPhotosById,
  updatePhoto,
} from "../controllers/photoController.js";

const photoRouter = Router();

photoRouter.get("/photos", getPhotos);
photoRouter.get("/photos/:id", getPhotosById);
photoRouter.post("/photos", createPhoto);
photoRouter.put("/photos/:id", updatePhoto);
photoRouter.delete("/photos/:id", deletePhoto);

export default photoRouter;
