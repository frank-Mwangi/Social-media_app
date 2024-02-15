import { sendNotFound, sendServerError } from "../helpers/helperFunctions.js";
import { getMessagesService } from "../services/messageServices.js";

export const getMessages = async (req, res) => {
  try {
    const data = await getMessagesService();
    if (data.length == 0) {
      sendNotFound(res, "No messages found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getMessagesById = async (req, res) => {
  try {
    const data = await getMessagesService();
    const message = data.find((item) => item.MessageID == req.params.id);
    if (!message) {
      sendNotFound(res, "Message not found");
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};
