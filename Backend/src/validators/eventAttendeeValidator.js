import joi from "joi";

export const eventAttendeeValidator = (attendee) => {
  const eventAttendeeValidatorSchema = joi.object({
    EventID: joi.number().required(),
    AttendeeID: joi.number().required(),
  });
  return eventAttendeeValidatorSchema.validate(attendee);
};
