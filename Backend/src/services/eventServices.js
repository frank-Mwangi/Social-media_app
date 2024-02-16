import { poolRequest, sql } from "../utils/dbConnect.js";

export const getEventsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Event");
    console.log(result.recordset);
    return result.recordset;
  } catch (error) {
    //console.log("Caught here");
    return error.message;
  }
};

export const getEventsByIdService = async (EventID) => {
  try {
    const result = await poolRequest()
      .input("EventID", sql.Int, EventID)
      .query("SELECT * FROM Event WHERE EventID=@EventID");
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const createEventService = async (newEvent) => {
  try {
    const { EventName, Description, EventDate, Location, EventPosterURL } =
      newEvent;
    const result = await poolRequest()
      .input("EventName", sql.VarChar, EventName)
      .input("Description", sql.VarChar, Description)
      .input("EventDate", sql.DateTime, EventDate)
      .input("Location", sql.VarChar, Location)
      .input("EventPosterURL", sql.VarChar, EventPosterURL)
      .query(
        "INSERT INTO Event VALUES (@EventName, @Description, @EventDate, @Location, @EventPosterURL)"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const updateEventService = async (event) => {
  try {
    const {
      EventID,
      EventName,
      Description,
      EventDate,
      Location,
      EventPosterURL,
    } = event;
    const result = await poolRequest()
      .input("EventID", sql.Int, EventID)
      .input("EventName", sql.VarChar, EventName)
      .input("Description", sql.VarChar, Description)
      .input("EventDate", sql.DateTime, EventDate)
      .input("Location", sql.VarChar, Location)
      .input("EventPosterURL", sql.VarChar, EventPosterURL)
      .query(
        "UPDATE Event SET EventName=@EventName, Description=@Description, EventDate=@EventDate, Location=@Location, EventPosterURL=@EventPosterURL WHERE EventID=@EventID"
      );
    return result;
  } catch (error) {
    return error.message;
  }
};

export const deleteEventService = async (EventID) => {
  try {
    await poolRequest()
      .input("EventID", sql.Int, EventID)
      .query("DELETE FROM Event WHERE EventID=@EventID");
  } catch (error) {
    return error.message;
  }
};
