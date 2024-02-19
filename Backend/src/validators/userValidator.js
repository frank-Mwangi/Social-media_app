import joi from "joi";

export const userValidator = (user) => {
  const userValidatorSchema = joi.object({
    Username: joi.string().min(3).max(30).required(),
    Email: joi.string().email().required(),
    Password: joi.string().required(),
    TagName: joi.string().alphanum().min(3).required(),
    Location: joi.string().alphanum().required(),
  });
  return userValidatorSchema.validate(user);
};

export const userLoginValidator = (user) => {
  const userLoginValidatorSchema = joi.object({
    Username: joi.string().required(),
    Password: joi.string().min(4).required(),
  });
  return userLoginValidatorSchema.validate(user);
};
