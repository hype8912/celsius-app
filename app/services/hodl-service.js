import axios from "axios";
import apiUrl from "./api-url";

const hodlService = {
  beginHodlMode,
};

function beginHodlMode(verificationCode) {
  return axios.post(`${apiUrl}/users/hodl_mode/begin`, {
    verificationCode,
  });
}

export default hodlService;
