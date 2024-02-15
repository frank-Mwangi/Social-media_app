import { sendNotFound } from "../helpers/helperFunctions.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const getUsersService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM [User]");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const createUserService = async (newUser) => {
  try {
    const result = await poolRequest()
      .input("Username", sql.VarChar, newUser.Username)
      .input("Email", sql.VarChar, newUser.Email)
      .input("Password", sql.VarChar, newUser.Password)
      .input("TagName", sql.VarChar, newUser.TagName)
      .input("Location", sql.VarChar, newUser.Location)
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
      .input("Username", sql.VarChar, Username)
      .input("Email", sql.VarChar, Email)
      .input("Password", sql.VarChar, Password)
      .input("TagName", sql.VarChar, TagName)
      .input("Location", sql.VarChar, Location)
      .query(
        "UPDATE [User] SET Username=@Username, Email=@Email, Password=@Password, TagName=@TagName, Location=@Location WHERE UserID=@UserID"
      );
    return result;
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
