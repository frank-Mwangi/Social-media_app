import {
  checkIfValuesIsEmptyNullUndefined,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createEventService,
  deleteEventService,
  getEventsByIdService,
  getEventsService,
  updateEventService,
} from "../services/eventServices.js";
import { eventValidator } from "../validators/eventValidator.js";

export const getEvents = async (req, res) => {
  try {
    const data = await getEventsService();
    console.log(data);
    if (data.length == 0) {
      sendNotFound(res, "Events not found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getEventById = async (req, res) => {
  try {
    //const event = await getEventsByIdService(req.params.id);
    const data = await getEventsService();
    const event = data.find((item) => item.EventID == req.params.id);
    if (!event) {
      sendNotFound(res, "Event not found");
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const createEvent = async (req, res) => {
  const { EventName, Description, EventDate, Location, EventPosterURL } =
    req.body;
  const { error } = eventValidator({
    EventName,
    Description,
    EventDate,
    Location,
    EventPosterURL,
  });
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    try {
      const newEvent = {
        EventName,
        Description,
        EventDate,
        Location,
        EventPosterURL,
      };
      const response = await createEventService(newEvent);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Event created sucessfully");
      }
    } catch (error) {
      sendServerError(res, error);
    }
  }
};

export const updateEvent = async (req, res) => {
  try {
    let event = await getEventsByIdService(req.params.id);
    if (event.length == 0) {
      sendNotFound(res, "Event not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
        const { EventName, Description, EventDate, Location, EventPosterURL } =
          req.body;
        if (EventName) {
          event.EventName = EventName;
        }
        if (Description) {
          event.Description = Description;
        }
        if (EventDate) {
          event.EventDate = EventDate;
        }
        if (Location) {
          event.Location = Location;
        }
        if (EventPosterURL) {
          event.EventPosterURL = EventPosterURL;
        }
        const updatedEvent = await updateEventService(event);
        console.log(updatedEvent);
        sendCreated(res, `Event id ${req.params.id} updated successfully`);
      } else {
        sendServerError(res, "Please provide complete edit fields");
      }
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const eventToDelete = await getEventsByIdService(id);
    if (eventToDelete.length == 0) {
      sendNotFound(res, "Event not found");
    } else {
      await deleteEventService(id);
      sendDeleteSuccess(res, `Event with ID ${id} successfully deleted`);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};
