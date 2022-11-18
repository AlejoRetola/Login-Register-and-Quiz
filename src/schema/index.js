import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid Email").required("Required"),
  user: yup.string().min(3, "User must have at least 3 letters").required("Required"),
  password: yup.string().required("Required").min(6, "Password has to be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Please match the password above")
    .required("Required"),
  checked: yup.boolean().isTrue("Please accept the terms and conditions"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid Email").required("Required"),
  password: yup.string().required("Required").min(6, "Password has to be at least 6 characters"),
});
