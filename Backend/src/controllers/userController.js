import {
  sendCreated,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createUserService,
  getUsersService,
} from "../services/userServices.js";
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
    console.log(data);
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
  const newUser = {
    userId: req.body.UserId,
    username: req.body.Username,
    email: req.body.Email,
    password: req.body.Password,
    tagname: req.body.TagName,
    location: req.body.Location,
  };
  console.log(newUser);
  const { error } = userValidator(newUser);
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // } else {
  try {
    console.log("first");
    let response = await createUserService(newUser);
    if (response.message) {
      console.log(response);
      sendServerError(res, response.message);
    } else {
      sendCreated(res, `User ${username} was created`);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
  // }
};
