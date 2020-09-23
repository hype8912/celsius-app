import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import contactsService from "../../services/contacts-service";
import { showMessage } from "../ui/uiActions";

export { connectPhoneContacts, getContacts };

/**
 * Saves all contacts from users Phonebook
 *
 * @param {Array} contacts - batch of phone contacts
 * @param {Object} opts
 * @param {Boolean} opts.clearExistingContacts - should clear all users contacts
 */
function connectPhoneContacts(contacts, opts) {
  return async dispatch => {
    dispatch(startApiCall(API.CONNECT_PHONE_CONTACTS));

    try {
      const res = await contactsService.connectPhoneContacts(contacts, opts);
      dispatch({
        type: ACTIONS.CONNECT_PHONE_CONTACTS_SUCCESS,
        contacts: res.data.contacts,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.CONNECT_PHONE_CONTACTS, err));
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
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_CONNECT_CONTACTS, err));
    }
  };
}

function getConnectedContactsSuccess(contacts) {
  return {
    type: ACTIONS.GET_CONNECTED_CONTACTS_SUCCESS,
    callName: API.GET_CONNECT_CONTACTS,
    contacts: contacts.length ? contacts : [],
  };
}
