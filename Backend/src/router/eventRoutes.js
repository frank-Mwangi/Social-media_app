import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";

const eventRoutes = Router();

eventRoutes.get("/events", getEvents);
eventRoutes.get("/events/:id", getEventById);
eventRoutes.post("/events", createEvent);
eventRoutes.put("/events/:id", updateEvent);
eventRoutes.delete("/events/:id", deleteEvent);

export default eventRoutes;
