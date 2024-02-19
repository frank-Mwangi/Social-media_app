import { poolRequest, sql } from "../utils/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const getUsersService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM [User]");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const getUsersByEmailService = async (Email) => {
  try {
    const result = await poolRequest()
      .input("Email", sql.VarChar, Email.toLowerCase())
      .query("SELECT * FROM [User] WHERE Email=@Email");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const createUserService = async (newUser) => {
  try {
    const result = await poolRequest()
      .input("Username", sql.VarChar, newUser.Username.toLowerCase())
      .input("Email", sql.VarChar, newUser.Email.toLowerCase())
      .input("Password", sql.VarChar, newUser.Password)
      .input("TagName", sql.VarChar, newUser.TagName.toLowerCase())
      .input("Location", sql.VarChar, newUser.Location.toLowerCase())
      .query(
        "INSERT INTO [User] (Username, Email, Password, TagName, Location) VALUES (@Username, @Email, @Password, @TagName, @Location)"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const updateUserService = async (user) => {
  const { UserID, Username, Email, Password, TagName, Location } = user;
  try {
    const result = await poolRequest()
      .input("UserID", sql.Int, UserID)
      .input("Username", sql.VarChar, Username.toLowerCase())
      .input("Email", sql.VarChar, Email.toLowerCase())
      .input("Password", sql.VarChar, Password)
      .input("TagName", sql.VarChar, TagName.toLowerCase())
      .input("Location", sql.VarChar, Location.toLowerCase())
      .query(
        "UPDATE [User] SET Username=@Username, Email=@Email, Password=@Password, TagName=@TagName, Location=@Location WHERE UserID=@UserID"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const findByCredentialsService = async (user) => {
  try {
    const userFoundResponse = await poolRequest()
      .input("Username", sql.VarChar, user.Username.toLowerCase())
      .query("SELECT * FROM [User] WHERE Username=@Username");
    if (userFoundResponse.recordset[0]) {
      if (
        await bcrypt.compare(
          user.Password,
          userFoundResponse.recordset[0].Password
        )
      ) {
        let token = jwt.sign(
          {
            id: userFoundResponse.recordset[0].UserID,
            username: userFoundResponse.recordset[0].Username,
            email: userFoundResponse.recordset[0].Email,
          },

          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        const { Password, ...user } = userFoundResponse.recordset[0];
        return { user, token: `JWT ${token}` };
      } else {
        return { error: "Invalid Credentials" };
      }
    } else {
      return { error: "Invalid Credentials" };
    }
  } catch (error) {
    return error;
  }
};

export const deleteUserService = async (UserID) => {
  try {
    await poolRequest()
      .input("UserID", sql.Int, UserID)
      .query("DELETE FROM [User] WHERE UserID=@UserID");
  } catch (error) {
    return error.message;
  }
};
