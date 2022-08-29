import { getCompanies } from "../../api";
import { ADD_CONTACT_COMPANIES } from "./types";

// fetch all contacts
export const fetchCompanies = () => (dispatch, getState) => {
  const company = getState().contact;
  if (company.companies) {
    dispatch({
      type: ADD_CONTACT_COMPANIES,
      payload: { data: company.companies },
    });
  } else {
    return getCompanies().then(({ data }) => {
      dispatch({
        type: ADD_CONTACT_COMPANIES,
        payload: data,
      });
    });
  }
};
