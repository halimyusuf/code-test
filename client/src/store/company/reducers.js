import { ADD_CONTACT_COMPANIES } from "./types";

// the contacts key refers to the first page, the page number will be used for other pages
const initialState = { companies: null };

export default function CompanyReducers(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT_COMPANIES:
      return {
        ...state,
        companies: action.payload.data,
      };

    default:
      return state;
  }
}

export const getCompaniesState = (state) => {
  const company = state.company;
  return company.companies;
};
