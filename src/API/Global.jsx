import axios from 'axios';
let settings = require('../settings.json');

export default class API {
  static async getSettings(app, callback) {
    await axios.get(
      `/app/get-app/${app}/`
    ).then(res => callback(res.data))
  }
}