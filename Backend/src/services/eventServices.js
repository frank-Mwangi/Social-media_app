import { poolRequest } from "../utils/dbConnect.js";

export const getEventsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Event");
    console.log(result.recordset);
    return result.recordset;
  } catch (error) {
    console.log("Caught here");
    return error.message;
  }
};
