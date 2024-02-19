import {
  checkIfValuesIsEmptyNullUndefined,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createGroupMemberService,
  deleteGroupMemberService,
  getGroupMembersByIDService,
  getGroupMembersService,
  getGroupsByMemberIDService,
} from "../services/groupMemberServices.js";
import { groupMembersValidator } from "../validators/groupMembersValidator.js";

export const getGroupMembers = async (req, res) => {
  try {
    const data = await getGroupMembersService();
    console.log(data);
    if (data.length == 0) {
      sendNotFound(res, "No GroupMembers found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getGroupMembersByID = async (req, res) => {
  try {
    const data = await getGroupMembersByIDService(req.params.id);

    if (!data) {
      sendNotFound(
        res,
        `Group Members for Group with ID ${req.params.id} not found`
      );
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getGroupsByMemberID = async (req, res) => {
  try {
    const data = await getGroupsByMemberIDService(req.params.id);

    if (data.length == 0) {
      sendNotFound(res, `Groups for Member ID ${req.params.id} not found`);
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const createGroupMember = async (req, res) => {
  const { GroupID, MemberID } = req.body;
  const { error } = groupMembersValidator({
    GroupID,
    MemberID,
  });
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    try {
      const newGroupMember = {
        GroupID,
        MemberID,
      };
      const response = await createGroupMemberService(newGroupMember);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "GroupMember created sucessfully");
      }
    } catch (error) {
      sendServerError(res, error);
    }
  }
};

export const deleteGroupMember = async (req, res) => {
  try {
    const GroupID = req.params.groupid;

    const MemberID = req.params.memberid;

    const data = await getGroupMembersService();
    console.log(data);
    const GroupMemberToDelete = data.find(
      (item) => item.GroupID == GroupID && item.MemberID == MemberID
    );
    if (!GroupMemberToDelete) {
      sendNotFound(res, "Group Member not found");
    } else {
      await deleteGroupMemberService(GroupID, MemberID);
      sendDeleteSuccess(res, `Group Member details successfully deleted`);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};
