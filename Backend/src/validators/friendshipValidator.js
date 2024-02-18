import joi from "joi";

export const friendshipValidator = (friendship) => {
  const friendshipValidatorSchema = joi.object({
    User1ID: joi.number().required(),
    User2ID: joi.number().required(),
    FriendshipDate: joi.date().required(),
  });
  return friendshipValidatorSchema.validate(friendship);
};
