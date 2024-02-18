import { poolRequest, sql } from "../utils/dbConnect.js";

export const getFriendshipsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Friendship");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const getAllFriendsOfAUserService = async (UserID) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.Int, UserID)
      .query(
        "SELECT [User].* FROM [User] INNER JOIN Friendship ON [User].UserID = Friendship.User2ID WHERE Friendship.User1ID = @UserID"
      );
    return result.recordset;
  } catch (error) {}
};

export const createFriendshipService = async (newFriendship) => {
  try {
    const result = await poolRequest()
      .input("User1ID", sql.Int, newFriendship.User1ID)
      .input("User2ID", sql.Int, newFriendship.User2ID)
      .input("FriendshipDate", sql.DateTime, newFriendship.FriendshipDate)

      .query(
        "INSERT INTO Friendship (User1ID, User2ID, FriendshipDate) VALUES (@User1ID, @User2ID, @FriendshipDate)"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteFriendshipService = async (FriendshipID) => {
  try {
    await poolRequest()
      .input("FriendshipID", sql.Int, FriendshipID)
      .query("DELETE FROM Friendship WHERE FriendshipID=@FriendshipID");
  } catch (error) {
    return error.message;
  }
};
