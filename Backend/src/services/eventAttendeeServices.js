import { poolRequest, sql } from "../utils/dbConnect.js";

export const getEventAteendeesService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM EventAttendee");
    //console.log(result.recordset);
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const getAttendeesByEventIdService = async (EventID) => {
  try {
    const result = await poolRequest()
      .input("EventID", sql.Int, EventID)
      .query(
        "SELECT UserID, Username, Email, TagName, Location FROM [User] INNER JOIN EventAttendee ON [User].UserID = EventAttendee.AttendeeID WHERE EventAttendee.EventID=@EventID"
      );
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const getEventsByAttendeeIdService = async (AttendeeID) => {
  try {
    const result = await poolRequest()
      .input("AttendeeID", sql.Int, AttendeeID)
      .query(
        "SELECT Event.* FROM Event INNER JOIN EventAttendee ON Event.EventID = EventAttendee.EventID WHERE EventAttendee.AttendeeID=@AttendeeID"
      );
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const createEventAttendeeService = async (newEventAttendee) => {
  try {
    const { EventID, AttendeeID } = newEventAttendee;
    const result = await poolRequest()
      .input("EventID", sql.Int, EventID)
      .input("AttendeeID", sql.Int, AttendeeID)
      .query("INSERT INTO EventAttendee VALUES (@EventID, @AttendeeID)");
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteEventAttendeeService = async (EventID, AttendeeID) => {
  try {
    await poolRequest()
      .input("EventID", sql.Int, EventID)
      .input("AttendeeID", sql.Int, AttendeeID)
      .query(
        "DELETE FROM EventAttendee WHERE EventID=@EventID AND AttendeeID=@AttendeeID"
      );
  } catch (error) {
    return error.message;
  }
};
