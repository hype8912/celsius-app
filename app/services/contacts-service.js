import axios from "axios";
import apiUrl from "./api-url";

const contactsService = {
  connectPhoneContacts,
  getContacts,
};

/**
 * Connects contacts from device phone book
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#0b117565-209f-4b10-8f5a-a02c63815330
 *
 * @param {Array} contacts - batch of phone contacts
 * @param {Object} opts
 * @param {Boolean} opts.clearExistingContacts - should clear all users contacts
 */
function connectPhoneContacts(contacts, opts) {
  return axios.post(`${apiUrl}/users/friends/contacts`, {
    contacts,
    clearExistingContacts: opts.clearExistingContacts
  });
}

/**
 * Gets all contacts for user
 * @see https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg?version=latest#a7f504cb-ba52-439c-add8-2881b96127ee
 *
 * @return {Promise}
 */
function getContacts() {
  return axios.get(`${apiUrl}/users/friends`);
}

export default contactsService;
