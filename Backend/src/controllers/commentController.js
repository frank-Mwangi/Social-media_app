import {
  checkIfValuesIsEmptyNullUndefined,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createCommentService,
  deleteCommentService,
  getCommentsService,
  updateCommentService,
} from "../services/commentServices.js";
import { commentValidator } from "../validators/commentValidator.js";

export const getComments = async (req, res) => {
  try {
    const data = await getCommentsService();
    if (data.length == 0) {
      sendNotFound(res, "No comments found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getCommentsById = async (req, res) => {
  try {
    const data = await getCommentsService();

    const comment = data.find((item) => item.CommentID == req.params.id);
    if (!comment) {
      sendNotFound(res, "Comment not found");
    } else {
      res.status(200).json(comment);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getCommentsByPostId = async (req, res) => {
  try {
    //console.log("Params: ", req.params.id);
    const data = await getCommentsService();
    //console.log("Data: ", data);
    const postComments = [];
    data.map((item) => {
      if (item.PostID == req.params.id) {
        postComments.push(item);
      }
    });
    // data.filter((item) => {
    //   return item.PostID == req.params.id;
    // });
    //console.log(postComments);
    if (postComments.length == 0) {
      sendNotFound(res, "No comments found");
    } else {
      res.status(200).json(postComments);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const createComment = async (req, res) => {
  const { PostID, UserID, CommentDate, Content } = req.body;
  const { error } = commentValidator({
    PostID,
    UserID,
    CommentDate,
    Content,
  });
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    try {
      const newComment = {
        PostID,
        UserID,
        CommentDate,
        Content,
      };
      const response = await createCommentService(newComment);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Comment created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateComment = async (req, res) => {
  try {
    const data = await getCommentsService();
    const comment = data.find((item) => item.CommentID == req.params.id);
    if (!comment) {
      sendNotFound(res, "Comment to update not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
        const { PostID, UserID, CommentDate, Content } = req.body;
        if (PostID) {
          comment.PostID = PostID;
        }
        if (UserID) {
          comment.UserID = UserID;
        }
        if (CommentDate) {
          comment.CommentDate = CommentDate;
        }
        if (Content) {
          comment.Content = Content;
        }

        const updatedComment = await updateCommentService(comment);
        //res.status(200).json(updatedUser);
        console.log(updatedComment);
        sendCreated(res, "Comment updated successfully");
      } else {
        sendServerError(res, "Please provide complete edit fields");
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getCommentsService();
    //console.log(data);
    const commentToDelete = data.find((item) => item.CommentID == id);
    //console.log(userToDelete);
    if (!commentToDelete) {
      sendNotFound(res, "Comment not found");
    } else {
      await deleteCommentService(id);
      sendDeleteSuccess(res, `Comment with ID ${id} deleted successfully`);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
