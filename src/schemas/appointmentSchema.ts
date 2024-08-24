import * as yup from "yup";

import { emailRegExp } from "../constants";

export const appointmentSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required.")
    .min(2, "Min length must be more than 2 symbols.")
    .max(32, "Max length must be less than 32 symbols."),
  phone: yup
    .string()
    .required("Phone number is required.")
    .matches(/^[0-9]+$/, "Enter a valid phone number.")
    .min(9, "Enter a valid phone number.")
    .max(9, "Enter a valid phone number."),
  time: yup
    .date()
    .required("Meeting time is required.")
    .min(new Date(), "Meeting time cannot be in the past."),
  email: yup
    .string()
    .required("Email is required.")
    .matches(emailRegExp, "Enter a valid email.")
    .email("Enter a valid email.")
    .max(64, "Max length must be less than 64 symbols."),
  comment: yup
    .string()
    .required("Comment is required.")
    .min(3, "Min length must be more than 3 symbols.")
    .max(64, "Max length must be less than 64 symbols."),
});
