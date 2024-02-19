import { poolRequest, sql } from "../utils/dbConnect.js";

export const getPhotosService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Photo");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const createPhotoService = async (newPhoto) => {
  const { UserID, PhotoURL, UploadDate } = newPhoto;
  try {
    const result = await poolRequest()
      .input("UserID", sql.Int, UserID)
      .input("PhotoURL", sql.VarChar, PhotoURL)
      .input("UploadDate", sql.DateTime, UploadDate)
      .query(
        "INSERT INTO Photo (UserID, PhotoURL, UploadDate) VALUES (@UserID, @PhotoURL, @UploadDate)"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const updatePhotoService = async (photo) => {
  const { PhotoID, UserID, PhotoURL, UploadDate } = photo;
  try {
    const result = await poolRequest()
      .input("PhotoID", sql.Int, PhotoID)
      .input("UserID", sql.Int, UserID)
      .input("PhotoURL", sql.VarChar, PhotoURL)
      .input("UploadDate", sql.DateTime, UploadDate)
      .query(
        "UPDATE Photo SET UserID=@UserID, PhotoURL=@PhotoURL, UploadDate=@UploadDate WHERE PhotoID=@PhotoID"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const deletePhotoService = async (PhotoID) => {
  try {
    await poolRequest()
      .input("PhotoID", sql.Int, PhotoID)
      .query("DELETE FROM Photo WHERE PhotoID=@PhotoID");
  } catch (error) {
    return error.message;
  }
};
