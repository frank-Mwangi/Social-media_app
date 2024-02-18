import joi from "joi";

export const commentValidator = (comment) => {
  const commentValidatorSchema = joi.object({
    PostID: joi.number().required(),
    UserID: joi.number().required(),
    CommentDate: joi.date().required(),
    Content: joi.string().required(),
  });
  return commentValidatorSchema.validate(comment);
};
