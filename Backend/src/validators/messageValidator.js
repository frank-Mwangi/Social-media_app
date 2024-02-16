import joi from "joi";

export const messageValidator = (message) => {
  const messageValidatorSchema = joi.object({
    SenderID: joi.number().required(),
    ReceiverID: joi.number().required(),
    MessageDate: joi.date().required(),
    Content: joi.string().required(),
  });
  return messageValidatorSchema.validate(message);
};
