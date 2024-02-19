import joi from "joi";

export const groupMembersValidator = (groupMember) => {
  const groupMembersValidatorSchema = joi.object({
    GroupID: joi.number().required(),
    MemberID: joi.number().required(),
  });
  return groupMembersValidatorSchema.validate(groupMember);
};
