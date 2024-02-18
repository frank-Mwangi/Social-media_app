import {
  checkIfValuesIsEmptyNullUndefined,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  updateUserService,
} from "../services/userServices.js";

import { userValidator } from "../validators/userValidator.js";

export const getUsers = async (req, res) => {
  try {
    console.log("Attempt made");
    const data = await getUsersService();
    if (data.length == 0) {
      sendNotFound(res, "No users found");
    } else {
      const userList = [];
      data.forEach((element) => {
        const { Password, ...userData } = element;
        userList.push(userData);
      });

      res.status(200).json(userList);
    }
  } catch (error) {
    console.log("Caught here");
    res.status(500).send("Server error");
  }
};

export const getUsersById = async (req, res) => {
  try {
    const data = await getUsersService();

    const user = data.find((item) => item.UserID == req.params.id);
    if (!user) {
      sendNotFound(res, "User not found");
    } else {
      const { Password, ...userData } = user;
      res.status(200).json(userData);
    }
  } catch {
    res.status(500).send("Server Error");
  }
};

export const createUser = async (req, res) => {
  const { Username, Email, Password, TagName, Location } = req.body;
  const { error } = userValidator({
    Username,
    Email,
    Password,
    TagName,
    Location,
  });
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    try {
      const newUser = {
        Username,
        Email,
        Password,
        TagName,
        Location,
      };
      const response = await createUserService(newUser);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "User created successfully");
        // res.status(200).json(newUser);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = await getUsersService();
    const user = data.find((item) => item.UserID == req.params.id);
    if (!user) {
      sendNotFound(res, "User to update not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
        const { Username, Email, Password, TagName, Location } = req.body;
        if (Username) {
          user.Username = Username;
        }
        if (Email) {
          user.Email = Email;
        }
        if (Password) {
          user.Password = Password;
        }
        if (TagName) {
          user.TagName = TagName;
        }
        if (Location) {
          user.Location = Location;
        }
        const updatedUser = await updateUserService(user);
        //res.status(200).json(updatedUser);
        console.log(updatedUser);
        sendCreated(res, "User updated successfully");
      } else {
        sendServerError(res, "Please provide a complete field");
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getUsersService();
    //console.log(data);
    const userToDelete = data.find((item) => (item.UserID = id));
    //console.log(userToDelete);
    if (!userToDelete) {
      sendNotFound(res, "User not found");
    } else {
      await deleteUserService(id);
      sendDeleteSuccess(res, `User with ID ${id} deleted successfully`);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
