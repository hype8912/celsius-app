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
 * @param {Object} contacts - @todo check payload
 * @return {Promise}
 */
function connectPhoneContacts(contacts) {
  return axios.post(`${apiUrl}/users/friends/contacts`, { contacts });
}

/**
 * Gets all contacts for user
 * @note not in Postman
 *
 * @return {Promise}
 */
function getContacts() {
  return axios.get(`${apiUrl}/users/friends`);
}

export default contactsService;
