import { sendNotFound, sendServerError } from "../helpers/helperFunctions.js";
import { getGroupsService } from "../services/groupServices.js";

export const getGroups = async (req, res) => {
  try {
    const data = await getGroupsService();
    console.log(data);
    if (data.length == 0) {
      sendNotFound(res, "No groups found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getGroupById = async (req, res) => {
  try {
    const data = await getGroupsService();
    console.log(data);
    const group = data.find((item) => item.GroupID == req.params.id);
    console.log(req.params.id);
    if (!group) {
      sendNotFound(res, "Group not found");
    } else {
      res.status(200).json(group);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
