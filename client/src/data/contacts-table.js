export const fieldGetter = (obj) => (fields) => {
  fields.forEach((field) => {
    obj = obj[field];
  });
  return obj;
};

export const headers = [
  { label: "First Name", extraProps: {} },
  { label: "Last Name", extraProps: {} },
  { label: "Phone Number", extraProps: {} },
  { label: "Email", extraProps: {} },
  { label: "Company Name", extraProps: {} },
  { label: "Actions", extraProps: {} },
];

export const values = [
  { fields: ["FirstName"], extraProps: {} },
  { fields: ["LastName"], extraProps: {} },
  { fields: ["PhoneNumber"], extraProps: {} },
  { fields: ["Email"], extraProps: {} },
  { fields: ["CompanyID", "LegalName"], extraProps: {} },
];
