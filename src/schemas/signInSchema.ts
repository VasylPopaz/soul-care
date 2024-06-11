import * as yup from "yup";

import { emailRegExp } from "../constants";

export const signInSchema = yup.object().shape({
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
