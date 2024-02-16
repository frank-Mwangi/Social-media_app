import joi from "joi";

export const postValidator = (post) => {
  const postValidatorSchema = joi.object({
    UserID: joi.number().required(),
    Content: joi.string().required(),
    PostDate: joi.date().required(),
    Likes: joi.number().required(),
    Comments: joi.number().required(),
  });
  return postValidatorSchema.validate(post);
};
