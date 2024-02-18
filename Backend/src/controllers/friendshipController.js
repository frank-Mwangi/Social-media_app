import {
  checkIfValuesIsEmptyNullUndefined,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createFriendshipService,
  deleteFriendshipService,
  getAllFriendsOfAUserService,
  getFriendshipsService,
} from "../services/friendshipService.js";
import { getUsersService } from "../services/userServices.js";
import { friendshipValidator } from "../validators/friendshipValidator.js";
import { getUsersById } from "./userController.js";

export const getFriendships = async (req, res) => {
  try {
    const data = await getFriendshipsService();
    if (data.length == 0) {
      sendNotFound(res, "No friendships found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const getFriendshipById = async (req, res) => {
  try {
    const data = await getFriendshipsService();

    const friendship = data.find((item) => item.FriendshipID == req.params.id);
    if (!friendship) {
      sendNotFound(res, "Friendship not found");
    } else {
      res.status(200).json(friendship);
    }
  } catch {
    res.status(500).send("Server Error");
  }
};

export const createFriendship = async (req, res) => {
  const { User1ID, User2ID, FriendshipDate } = req.body;
  const { error } = friendshipValidator({
    User1ID,
    User2ID,
    FriendshipDate,
  });
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    try {
      const newFriendship = {
        User1ID,
        User2ID,
        FriendshipDate,
      };
      const response = await createFriendshipService(newFriendship);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Friendship created successfully");
        // res.status(200).json(newUser);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const getAllFriendsOfAUser = async (req, res) => {
  try {
    const UserID = req.params.id;
    const data = await getUsersService();

    const User = data.find((item) => item.UserID == UserID);
    console.log(User);
    if (!User) {
      sendNotFound(res, "User not found");
    } else {
      const friends = await getAllFriendsOfAUserService(UserID);
      if (friends.length == 0) {
        sendNotFound(res, "No friends found");
      } else {
        res.status(200).json(friends);
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deleteFriendship = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getFriendshipsService();
    //console.log(data);
    const friendshipToDelete = data.find((item) => (item.FriendshipID = id));
    //console.log(userToDelete);
    if (!friendshipToDelete) {
      sendNotFound(res, "Friendship not found");
    } else {
      await deleteFriendshipService(id);
      sendDeleteSuccess(res, `Friendship with ID ${id} deleted successfully`);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
