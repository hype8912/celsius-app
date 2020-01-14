import ACTIONS from "../../constants/ACTIONS";
import { startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import logger from "../../utils/logger-util";
import contactsService from "../../services/contacts-service";

export { connectPhoneContacts, getContacts };

/**
 * Saves all contacts from users Phonebook
 * @param {Object[]} contacts
 */
function connectPhoneContacts(contacts) {
  return async dispatch => {
    dispatch(startApiCall(API.CONNECT_PHONE_CONTACTS));

    try {
      await contactsService.connectPhoneContacts(contacts);
      dispatch({ type: ACTIONS.CONNECT_PHONE_CONTACTS_SUCCESS });
    } catch (err) {
      logger.err(err);
    }
  };
}

/**
 * Gets all contacts for user
 */
function getContacts() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_CONNECT_CONTACTS));

    try {
      const res = await contactsService.getContacts();
      dispatch(getConnectedContactsSuccess(res.data.contacts));
    } catch (err) {
      logger.err(err);
    }
  };
}

/**
 * TODO add JSDoc
 */
function getConnectedContactsSuccess(contacts) {
  return {
    type: ACTIONS.GET_CONNECTED_CONTACTS_SUCCESS,
    callName: API.GET_CONNECT_CONTACTS,
    contacts,
  };
}
