import { poolRequest, sql } from "../utils/dbConnect.js";

export const getMessagesService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Message");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const createMessageService = async (newMessage) => {
  try {
    const result = await poolRequest()
      .input("SenderID", sql.Int, newMessage.SenderID)
      .input("ReceiverID", sql.Int, newMessage.ReceiverID)
      .input("MessageDate", sql.DateTime, newMessage.MessageDate)
      .input("Content", sql.VarChar, newMessage.Content)
      .query(
        "INSERT INTO Message (SenderID, ReceiverID, MessageDate, Content) VALUES (@SenderID, @ReceiverID, @MessageDate, @Content)"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const updateMessageService = async (message) => {
  const { MessageID, SenderID, ReceiverID, MessageDate, Content } = message;
  try {
    const result = await poolRequest()
      .input("MessageID", sql.Int, MessageID)
      .input("SenderID", sql.Int, SenderID)
      .input("ReceiverID", sql.Int, ReceiverID)
      .input("MessageDate", sql.DateTime, MessageDate)
      .input("Content", sql.VarChar, Content)
      .query(
        "UPDATE Message SET SenderID=@SenderID, ReceiverID=@ReceiverID, MessageDate=@MessageDate, Content=@Content WHERE MessageID=@MessageID"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteMessageService = async (MessageID) => {
  try {
    await poolRequest()
      .input("MessageID", sql.Int, MessageID)
      .query("DELETE FROM Message WHERE MessageID=@MessageID");
  } catch (error) {
    return error.message;
  }
};
