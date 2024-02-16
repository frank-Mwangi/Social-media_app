import { poolRequest, sql } from "../utils/dbConnect.js";

export const getPostsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Post");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const createPostService = async (newPost) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.Int, newPost.UserID)
      .input("Content", sql.VarChar, newPost.Content)
      .input("PostDate", sql.DateTime, newPost.PostDate)
      .input("Likes", sql.Int, newPost.Likes)
      .input("Comments", sql.Int, newPost.Comments)
      .query(
        "INSERT INTO Post (UserID, Content, PostDate, Likes, Comments) VALUES (@UserID, @Content, @PostDate, @Likes, @Comments)"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const updatePostService = async (post) => {
  const { PostID, UserID, Content, PostDate, Likes, Comments } = post;
  try {
    const result = await poolRequest()
      .input("PostID", sql.Int, PostID)
      .input("UserID", sql.Int, UserID)
      .input("Content", sql.VarChar, Content)
      .input("PostDate", sql.DateTime, PostDate)
      .input("Likes", sql.Int, Likes)
      .input("Comments", sql.Int, Comments)
      .query(
        "UPDATE Post SET UserID=@UserID, Content=@Content, PostDate=@PostDate, Likes=@Likes, Comments=@Comments WHERE PostID=@PostID"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const deletePostService = async (PostID) => {
  try {
    await poolRequest()
      .input("PostID", sql.Int, PostID)
      .query("DELETE FROM Post WHERE PostID=@PostID");
  } catch (error) {
    return error.message;
  }
};
