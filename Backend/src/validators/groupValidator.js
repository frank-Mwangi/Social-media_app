import joi from "joi";

export const groupValidator = (group) => {
  const groupValidatorSchema = joi.object({
    GroupName: joi.string().min(3).max(30).required(),
    Description: joi.string().required(),
    CreatedDate: joi.date().required(),
  });
  return groupValidatorSchema.validate(group);
};
