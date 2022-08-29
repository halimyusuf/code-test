import { addContact, editContact, getContacts } from "../../api";
import { combineQueries } from "../../utils";
import {
  ADD_CONTACT,
  ADD_CONTACTS,
  EDIT_CONTACT,
  UPDATE_PARAMS,
} from "./types";

/*
 Actions
*/

// add new contact
export const addNewContact = (contact) => (dispatch) => {
  return addContact(contact).then(({ data }) => {
    dispatch({
      type: ADD_CONTACT,
      payload: data,
    });
  });
};

// fetch all contacts
export const fetchContacts =
  (query = {}) =>
  (dispatch, getState) => {
    const contact = getState().contact;
    const combineQuery = combineQueries(query);
    if (contact[combineQuery]) {
      // return data if page has been fetched before
      dispatch({
        type: UPDATE_PARAMS,
        payload: { ...contact.params, ...query },
      });
    } else {
      return getContacts(query).then(({ data }) => {
        dispatch({
          type: ADD_CONTACTS,
          payload: data,
        });
      });
    }
  };

// edit contact detail
export const editContactDetail = (contact, id) => (dispatch) => {
  return editContact(contact, id).then(({ data }) => {
    dispatch({
      type: EDIT_CONTACT,
      payload: data,
    });
  });
};
