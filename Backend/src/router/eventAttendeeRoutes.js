import { Router } from "express";
import {
  createEventAttendee,
  deleteEventAttendee,
  getAttendeesByEventId,
  getEventAttendees,
  getEventsByAttendeeId,
} from "../controllers/eventAttendeeController.js";

const eventAttendeeRouter = Router();

eventAttendeeRouter.get("/eventattendees", getEventAttendees);
eventAttendeeRouter.get("/eventattendees/:id", getAttendeesByEventId);
eventAttendeeRouter.get("/:id/eventattendees", getEventsByAttendeeId);
eventAttendeeRouter.post("/eventattendees", createEventAttendee);
eventAttendeeRouter.delete(
  "/eventattendees/:eventid/:attendeeid",
  deleteEventAttendee
);

export default eventAttendeeRouter;
