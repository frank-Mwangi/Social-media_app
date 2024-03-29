import express from "express";
import logger from "../utils/logger.js";
import nodemailer from "nodemailer";
import cron from "node-cron";
import emailTemp from "../../emailTemp.js";
import dotenv from "dotenv";

import bcrypt from "bcrypt";
import {
  checkIfValuesIsEmptyNullUndefined,
  notAuthorized,
  sendBadRequest,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createUserService,
  deleteUserService,
  findByCredentialsService,
  getUsersByEmailService,
  getUsersService,
  updateUserService,
} from "../services/userServices.js";

import {
  userLoginValidator,
  userValidator,
} from "../validators/userValidator.js";

export const registerUser = async (req, res) => {
  const { Username, Email, Password, TagName, Location } = req.body;
  const { error } = userValidator({
    Username,
    Email,
    Password,
    TagName,
    Location,
  });
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    const ourUser = await getUsersByEmailService(Email);

    console.log(ourUser.length);
    if (ourUser.length !== 0) {
      res.status(400).send("User already exists");
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        console.log(hashedPassword);
        const newUser = {
          Username,
          Email,
          Password: hashedPassword,
          TagName,
          Location,
        };
        const response = await createUserService(newUser);
        if (response.message) {
          console.log("Error here");
          sendServerError(res, response.message);
        } else {
          sendMail(newUser.Email, newUser.Username);
          sendCreated(res, "User created successfully");
        }
      } catch (error) {
        sendServerError(res, error.message);
      }
    }
  }
};

export const sendMail = async (email, username, req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Welcome to Hiphonic",
    html: `Welcome to Hiphonic, ${username}! We are thrilled to have you on the platform.`,
    //html: emailTemp,
  };
  try {
    logger.info("Sending mail...");
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error(error);
        res.status(500).send(error);
      } else {
        logger.info(`Email sent: ${info.response}`);
        res.status(200).send(info.response);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

export const loginUser = async (req, res) => {
  const { Username, Password } = req.body;
  const { error } = userLoginValidator({ Username, Password });
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const userResponse = await findByCredentialsService({
        Username,
        Password,
      });
      if (userResponse.error) {
        notAuthorized(res, userResponse.error);
      } else {
        res.status(200).send(userResponse);
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  }
};

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

// export const createUser = async (req, res) => {
//   const { Username, Email, Password, TagName, Location } = req.body;
//   const { error } = userValidator({
//     Username,
//     Email,
//     Password,
//     TagName,
//     Location,
//   });
//   if (error) {
//     res.status(400).send(error.details[0].message);
//   } else {
//     try {
//       const newUser = {
//         Username,
//         Email,
//         Password,
//         TagName,
//         Location,
//       };
//       const response = await createUserService(newUser);
//       if (response.message) {
//         sendServerError(res, response.message);
//       } else {
//         sendCreated(res, "User created successfully");
//         // res.status(200).json(newUser);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

export const updateUser = async (req, res) => {
  try {
    const data = await getUsersService();
    const user = data.find((item) => item.UserID == req.params.id);
    if (!user) {
      sendNotFound(res, "User to update not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
        const { Username, Email, Password, TagName, Location } = req.body;

        if (Email) {
          const emailExists = await getUsersByEmailService(Email);
          if (emailExists) {
            res.status(401).json({
              message: "Email already exists. Please choose another.",
            });
            return;
          } else {
            user.Email = Email;
          }
        }
        if (Username) {
          user.Username = Username;
        }
        if (Password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(Password, salt);
          user.Password = hashedPassword;
        }
        if (TagName) {
          user.TagName = TagName;
        }
        if (Location) {
          user.Location = Location;
        }

        await updateUserService(user);
        sendCreated(res, "User updated successfully");

        sendBadRequest(res, error);

        //res.status(200).json(updatedUser);
        //console.log(updatedUser);
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
    const userToDelete = data.find((item) => item.UserID == req.params.id);
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
