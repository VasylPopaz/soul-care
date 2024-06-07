import * as yup from "yup";

import { emailRegExp } from "../constants";

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Min length must be more than 2 chars")
    .max(32, "Max length must be less than 32 chars"),
  email: yup
    .string()
    .matches(emailRegExp, "Enter a valid Email")
    .email("Enter a valid Email")
    .required("Email is required")
    .max(64, "Max length must be less than 64 chars"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Min length must be more than 8 chars")
    .max(64, "Max length must be less than 64 chars"),
});
