import _ from "lodash";
import { combineQueries } from "../../utils";
import {
  ADD_CONTACT,
  ADD_CONTACTS,
  EDIT_CONTACT,
  UPDATE_PARAMS,
} from "./types";

// the contacts key refers to the first page, the page number will be used for other pages
const initialState = { params: {} };

export default function ContactReducers(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT: {
      const query = combineQueries(state.params);
      return {
        ...state,
        [query]: [action.payload, ...state[query]],
      };
    }

    case ADD_CONTACTS:
      return {
        ...state,
        [combineQueries(action.payload)]: action.payload.data,
        params: _.omit(action.payload, ["data"]),
      };

    case EDIT_CONTACT: {
      const query = combineQueries(state.params);
      state[query] = state[query].map((record) => {
        if (record._id === action.payload._id) {
          return action.payload;
        } else {
          return record;
        }
      });
      console.log(state[query]);
      return {
        ...state,
        [query]: state[query],
      };
    }

    case UPDATE_PARAMS:
      return {
        ...state,
        params: { ...action.payload },
      };

    default:
      return state;
  }
}

/* 
 State Getters
*/
export const getContactState = (state) => {
  const contact = state.contact;
  const query = combineQueries(contact.params);
  return contact[query];
};

export const getContactParams = (state) => {
  const contact = state.contact;
  return contact.params;
};
