// TODO(fj): load api url from Manifest in every service

import {Constants} from 'expo';

const {API_URL} = Constants.manifest.extra;

export default API_URL;
