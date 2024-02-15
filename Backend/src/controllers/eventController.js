import { sendNotFound, sendServerError } from "../helpers/helperFunctions.js";
import { getEventsService } from "../services/eventServices.js";

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
