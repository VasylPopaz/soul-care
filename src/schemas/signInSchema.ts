import * as yup from "yup";

import { emailRegExp } from "../constants";

export const signInSchema = yup.object().shape({
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
