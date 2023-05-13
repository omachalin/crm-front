import axios from "axios";
import qs from "qs"
const settings = require('./settings.json');

const fetcher = axios.create({
  ...axios.defaults,
  baseURL: settings.APIUrl,
  paramsSerializer: (params) => {
    return qs.stringify(params, {arrayFormat: "repeat"})
  }
});

export default fetcher
