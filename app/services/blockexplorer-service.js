import axios from "axios";

const apiUrl = 'http://hackathon.celsius.network/api/identity/'

const blockExplorerService = {
  getUserSettings,
  getAddress,
  createNewIdentity,
  enableTracking,
  disableTracking,
  getAllIdentities,
}

function getUserSettings(userId) {
  return axios.get(`${apiUrl}/settings/${userId}`);
}

function getAddress(userId) {
  return axios.get(`${apiUrl}/${userId}`);
}

function getAllIdentities(userId) {
  return axios.get(`${apiUrl}/all/${userId}`);
}

function createNewIdentity(userId) {
  return axios.post (`${apiUrl}`, {
    userId
  });
}

function enableTracking (userId) {
  return axios.post (`${apiUrl}/enable`, {
    userId
  });
}

function disableTracking (userId) {
  return axios.post (`${apiUrl}/disable`, {
    userId
  });
}


export default blockExplorerService
