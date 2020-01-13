import axios from "axios";
import { Buffer } from "buffer";
import Constants from "../../constants";

const MIXPANEL_API_URL = "https://api.mixpanel.com";
const { MIXPANEL_TOKEN } = Constants;

const mixpanelService = {
  track,
  engage,
};

/**
 * Set event tracking
 *
 * @returns {Promise}
 */
function track(event, payload = {}) {
  let data = {
    event,
    properties: payload,
  };
  data.properties.token = MIXPANEL_TOKEN;
  data = new Buffer(JSON.stringify(data)).toString("base64");

  return axios.get(`${MIXPANEL_API_URL}/track/?data=${data}`);
}

/**
 * Init user data
 *
 * @returns {Promise}
 */
function engage(distinctId, userData = {}) {
  let data = { $set: { ...userData } };
  data.$distinct_id = distinctId;
  data.$token = MIXPANEL_TOKEN;
  data = new Buffer(JSON.stringify(data)).toString("base64");

  return axios.get(`${MIXPANEL_API_URL}/engage/?data=${data}`);
}

export default mixpanelService;
