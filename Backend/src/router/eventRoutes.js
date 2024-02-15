import { Router } from "express";
import { getEventById, getEvents } from "../controllers/eventController.js";

const eventRoutes = Router();

eventRoutes.get("/events", getEvents);
eventRoutes.get("/events/:id", getEventById);

export default eventRoutes;
