import {
  checkIfValuesIsEmptyNullUndefined,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createEventAttendeeService,
  deleteEventAttendeeService,
  getAttendeesByEventIdService,
  getEventAteendeesService,
  getEventsByAttendeeIdService,
} from "../services/eventAttendeeServices.js";
import { eventAttendeeValidator } from "../validators/eventAttendeeValidator.js";

export const getEventAttendees = async (req, res) => {
  try {
    const data = await getEventAteendeesService();
    console.log(data);
    if (data.length == 0) {
      sendNotFound(res, "No EventAttendees found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAttendeesByEventId = async (req, res) => {
  try {
    const data = await getAttendeesByEventIdService(req.params.id);

    if (!data) {
      sendNotFound(
        res,
        `Event Attendees for Event with ID ${req.params.id} not found`
      );
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getEventsByAttendeeId = async (req, res) => {
  try {
    const data = await getEventsByAttendeeIdService(req.params.id);

    if (data.length == 0) {
      sendNotFound(res, `Events for user ID ${req.params.id} not found`);
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const createEventAttendee = async (req, res) => {
  const { EventID, AttendeeID } = req.body;
  const { error } = eventAttendeeValidator({
    EventID,
    AttendeeID,
  });
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    try {
      const newEventAttendee = {
        EventID,
        AttendeeID,
      };
      const response = await createEventAttendeeService(newEventAttendee);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Event Attendee created sucessfully");
      }
    } catch (error) {
      sendServerError(res, error);
    }
  }
};

export const deleteEventAttendee = async (req, res) => {
  try {
    const EventID = req.params.eventid;
    //console.log(EventID);
    const AttendeeID = req.params.attendeeid;
    //console.log(AttendeeID);
    const data = await getEventAteendeesService();
    console.log(data);
    const eventAttendeeToDelete = data.find(
      (item) => item.EventID == EventID && item.AttendeeID == AttendeeID
    );
    if (!eventAttendeeToDelete) {
      sendNotFound(res, "Event Attendee not found");
    } else {
      await deleteEventAttendeeService(EventID, AttendeeID);
      sendDeleteSuccess(res, `Event Attendee details successfully deleted`);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};
