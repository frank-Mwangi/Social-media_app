import { poolRequest } from "../utils/dbConnect.js";

export const getMessagesService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Message");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};
