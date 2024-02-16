import joi from "joi";

export const eventValidator = (event) => {
  const eventValidatorSchema = joi.object({
    EventName: joi.string().min(3).max(30).required(),
    Description: joi.string().required(),
    EventDate: joi.date().required(),
    Location: joi.string().alphanum().required(),
    EventPosterURL: joi.string().alphanum().required(),
  });
  return eventValidatorSchema.validate(event);
};
