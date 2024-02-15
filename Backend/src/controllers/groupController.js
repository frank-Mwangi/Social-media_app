import {
  checkIfValuesIsEmptyNullUndefined,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createGroupsService,
  deleteGroupService,
  getGroupsService,
  updateGroupService,
} from "../services/groupServices.js";
import logger from "../utils/logger.js";
import { groupValidator } from "../validators/groupValidator.js";

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

export const createGroup = async (req, res) => {
  try {
    const { GroupName, Description, CreatedDate } = req.body;
    const { error } = groupValidator({
      GroupName,
      Description,
      CreatedDate,
    });
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      try {
        const newGroup = {
          GroupName,
          Description,
          CreatedDate,
        };
        const response = await createGroupsService(newGroup);
        //console.log(response);
        if (response.message) {
          sendServerError(res, response.message);
        } else {
          sendCreated(res, "Group created successfully");
        }
      } catch (error) {}
    }
  } catch (error) {
    logger.info(error.message);
  }
};

export const updateGroup = async (req, res) => {
  try {
    const data = await getGroupsService();
    const group = data.find((item) => item.GroupID == req.params.id);
    if (!group) {
      sendNotFound(res, "Group not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
        const { GroupName, Description, CreatedDate } = req.body;
        if (GroupName) {
          group.GroupName = GroupName;
        }
        if (Description) {
          group.Description = Description;
        }
        if (CreatedDate) {
          group.CreatedDate = CreatedDate;
        }
        const updatedGroup = await updateGroupService(group);
        sendCreated(res, "Group updated successfully");
      } else {
        sendServerError(res, "Please provide complete edit fields");
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log("Attempt made");
    const data = await getGroupsService();
    //console.log(data);
    const group = data.find((item) => item.GroupID == id);
    if (!group) {
      sendNotFound(res, "Group not found");
    } else {
      await deleteGroupService(id);
      sendDeleteSuccess(res, `Group with ID ${id} deleted successfully`);
    }
  } catch (error) {
    //console.log("Error logged here");
    sendServerError(res, error.message);
  }
};
