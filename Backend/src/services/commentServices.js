import { poolRequest, sql } from "../utils/dbConnect.js";

export const getCommentsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Comment");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const createCommentService = async (newComment) => {
  const { PostID, UserID, CommentDate, Content } = newComment;
  try {
    const result = await poolRequest()
      .input("PostID", sql.Int, PostID)
      .input("UserID", sql.Int, UserID)
      .input("CommentDate", sql.DateTime, CommentDate)
      .input("Content", sql.VarChar, Content)
      .query(
        "INSERT INTO Post (PostID, UserID, CommentDate, Content) VALUES (@PostID, @UserID, @CommentDate, @Content)"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const updateCommentService = async (comment) => {
  const { CommentID, PostID, UserID, CommentDate, Content } = comment;
  try {
    const result = await poolRequest()
      .input("CommentID", sql.Int, CommentID)
      .input("PostID", sql.Int, PostID)
      .input("UserID", sql.Int, UserID)
      .input("CommentDate", sql.DateTime, CommentDate)
      .input("Content", sql.VarChar, Content)
      .query(
        "UPDATE Comment SET PostID=@PostID, UserID=@UserID, CommentDate=@CommentDate, Content=@content WHERE CommentID=@CommentID"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteCommentService = async (CommentID) => {
  try {
    await poolRequest()
      .input("CommentID", sql.Int, CommentID)
      .query("DELETE FROM Comment WHERE CommentID=@CommentID");
  } catch (error) {
    return error.message;
  }
};
