import { poolRequest } from "../utils/dbConnect.js";

export const getGroupsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM [Group]");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};
