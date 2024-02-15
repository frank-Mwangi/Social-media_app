import { poolRequest, sql } from "../utils/dbConnect.js";

export const getUsersService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM [User]");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const createUserService = async (user) => {
  try {
    const result = await poolRequest()
      .input("Username", sql.VarChar, user.Username)
      .input("Email", sql.VarChar, user.Email)
      .input("Password", sql.VarChar)
      .input("TagName", sql.VarChar)
      .input("Location", sql.VarChar)
      .query(
        "INSERT INTO [User] (Username, Email, Password, TagName, Location) VALUES (@Username, @Email, @Password, @TagName, @Location)"
      );
    return result;
  } catch (error) {
    return error;
  }
};
