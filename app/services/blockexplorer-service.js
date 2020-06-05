import axios from "axios";

const apiUrl = 'http://hackathon.celsius.network/api/identity/'

const blockExplorerService = {
  getUserSettings,
  createNewIdentity
}

function getUserSettings(userId) {
  return axios.get(`${apiUrl}/settings/${userId}`);
}

function createNewIdentity(userId) {
  return axios.post (`${apiUrl}`, {
    userId
  });
}

export default blockExplorerService
