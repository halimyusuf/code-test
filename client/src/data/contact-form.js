import * as yup from "yup";

export const formObj = [
  { field: "FirstName", label: "First Name" },
  { field: "LastName", label: "Last Name" },
  { field: "Email", label: "Email" },
  { field: "PhoneNumber", label: "Phone Number" },
];

export const validationSchema = yup.object({
  FirstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First name should be of minimum 3 characters length"),
  LastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last name should be of minimum 3 characters length"),
  CompanyID: yup.string().required("Company is required"),
  PhoneNumber: yup
    .string()
    .required("Phone Number is required")
    .min(8, "Invalid Phone NUmber"),
  Email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
});
