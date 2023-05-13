import fetcher from "../fetcher";
const globalSettings = require('../settings.json')

export default class API {
  static async getSettings(app_name, callback) {
    await fetcher.get(
      `/basesetting/base-setting/?app_fk=${globalSettings[app_name + '_app']}`
    ).then(res => callback(Object.fromEntries(res.data.results.map(({name, value}) => [name, value]))))
  }
}