import joi from "joi";

export const userValidator = (user) => {
  const userValidatorSchema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joi.string().required(),
    tagname: joi.string().alphanum().min(3).required(),
    location: joi.string().alphanum().required(),
  });
  return userValidatorSchema.validate(user);
};
