import joi from "joi";

export const photoValidator = (photo) => {
  const photoValidatorSchema = joi.object({
    UserID: joi.number().required(),
    PhotoURL: joi.string().alphanum().required(),
    UploadDate: joi.date().required(),
  });
  return photoValidatorSchema.validate(photo);
};
