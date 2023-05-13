import axios from "axios";
const settings = require('./settings.json');

const fetcher = axios.create({
  ...axios.defaults,
  baseURL: settings.APIUrl,
});

export default fetcher
