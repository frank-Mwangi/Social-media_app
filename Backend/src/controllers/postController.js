import {
  checkIfValuesIsEmptyNullUndefined,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createPostService,
  deletePostService,
  getPostsService,
  updatePostService,
} from "../services/postServices.js";
import { postValidator } from "../validators/postValidator.js";

export const getPosts = async (req, res) => {
  try {
    const data = await getPostsService();
    if (data.length == 0) {
      sendNotFound(res, "No posts found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getPostsById = async (req, res) => {
  try {
    const data = await getPostsService();

    const post = data.find((item) => item.PostID == req.params.id);
    if (!post) {
      sendNotFound(res, "Post not found");
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const createPost = async (req, res) => {
  const { UserID, Content, PostDate, Likes, Comments } = req.body;
  const { error } = postValidator({
    UserID,
    Content,
    PostDate,
    Likes,
    Comments,
  });
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    try {
      const newPost = {
        UserID,
        Content,
        PostDate,
        Likes,
        Comments,
      };
      const response = await createPostService(newPost);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Post created successfully");
        // res.status(200).json(newUser);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const updatePost = async (req, res) => {
  try {
    const data = await getPostsService();
    const post = data.find((item) => item.PostID == req.params.id);
    if (!post) {
      sendNotFound(res, "Post to update not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
        const { UserID, Content, PostDate, Likes, Comments } = req.body;
        if (UserID) {
          post.UserID = UserID;
        }
        if (Content) {
          post.Content = Content;
        }
        if (PostDate) {
          post.PostDate = PostDate;
        }
        if (Likes) {
          post.Likes = Likes;
        }
        if (Comments) {
          post.Comments = Comments;
        }
        const updatedPost = await updatePostService(post);
        //res.status(200).json(updatedUser);
        console.log(updatedPost);
        sendCreated(res, "Post updated successfully");
      } else {
        sendServerError(res, "Please provide complete edit fields");
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getPostsService();
    //console.log(data);
    const postToDelete = data.find((item) => item.PostID == id);
    //console.log(userToDelete);
    if (!postToDelete) {
      sendNotFound(res, "User not found");
    } else {
      await deletePostService(id);
      sendDeleteSuccess(res, `Post with ID ${id} deleted successfully`);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
