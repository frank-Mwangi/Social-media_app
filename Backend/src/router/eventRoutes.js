import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

const eventRoutes = Router();

eventRoutes.get("/events", authMiddleware, getEvents);
eventRoutes.get("/events/:id", authMiddleware, getEventById);
eventRoutes.post("/events", authMiddleware, createEvent);
eventRoutes.put("/events/:id", authMiddleware, updateEvent);
eventRoutes.delete("/events/:id", authMiddleware, deleteEvent);

export default eventRoutes;
