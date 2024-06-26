import * as yup from "yup";

import { emailRegExp } from "../constants";

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Min length must be more than 2 symbols.")
    .max(32, "Max length must be less than 32 symbols."),
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegExp, "Enter a valid email")
    .email("Enter a valid email")
    .max(64, "Max length must be less than 64 symbols."),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Min length must be more than 8 symbols.")
    .max(64, "Max length must be less than 64 symbols."),
});
