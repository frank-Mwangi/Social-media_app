import {
  checkIfValuesIsEmptyNullUndefined,
  sendCreated,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createUserService,
  getUsersService,
  updateUserService,
} from "../services/userServices.js";
import { poolRequest } from "../utils/dbConnect.js";
import { userValidator } from "../validators/userValidator.js";

export const getUsers = async (req, res) => {
  try {
    const data = await getUsersService();
    if (data.length == 0) {
      sendNotFound(res, "No users found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
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
      res.status(200).json(user);
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
