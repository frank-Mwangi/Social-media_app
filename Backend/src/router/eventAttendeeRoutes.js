import { Router } from "express";
import {
  createEventAttendee,
  deleteEventAttendee,
  getAttendeesByEventId,
  getEventAttendees,
  getEventsByAttendeeId,
} from "../controllers/eventAttendeeController.js";
import { authMiddleware } from "../middlewares/userAuthMiddleware.js";

const eventAttendeeRouter = Router();

eventAttendeeRouter.get("/eventattendees", authMiddleware, getEventAttendees);
eventAttendeeRouter.get(
  "/eventattendees/:id",
  authMiddleware,
  getAttendeesByEventId
);
eventAttendeeRouter.get(
  "/:id/eventattendees",
  authMiddleware,
  getEventsByAttendeeId
);
eventAttendeeRouter.post(
  "/eventattendees",
  authMiddleware,
  createEventAttendee
);
eventAttendeeRouter.delete(
  "/eventattendees/:eventid/:attendeeid",
  authMiddleware,
  deleteEventAttendee
);

export default eventAttendeeRouter;
