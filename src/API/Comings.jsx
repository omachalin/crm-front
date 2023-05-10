import axios from 'axios';
const settings = require("../settings.json");

export default class Comings {

  static async getClients(page = 1, callback, params = {}) {
    await axios.get(
      `coming/get-coming/get_coming_with_client/?page=${page}`, {
      params
    }).then(res => { callback(res.data) }
    )
  }

  static async addClient(params, callback) {
    await axios.post(
      `/client/client/`, params
    ).then(res => callback(res.data))
  }

  static async addComing(params, callback) {
    await axios.post(
      `/coming/get-coming/`, params
    ).then(res => callback(res.data))
  }

  static async cloneClient(pk, callback) {
    await axios.put(
      `/coming/coming-clone/${pk}/`
    ).then(res => callback(res.data))
  }

  static async removeComing(pk) {
    await axios.delete(
      `/coming/get-coming/${pk}/`,
    )
  }

  static async patchClient(pk, params, callback) {
    await axios.patch(
      `/client/client/${pk}/`, params
    ).then(res => callback(res.data))
  }

  static async patchComing(pk, params, callback = () => { }) {
    await axios.patch(
      `/coming/get-coming/${pk}/`, params
    ).then(res => { console.log(res); callback(res.data) })
  }

  static async searchClient(params, callback) {
    await axios.get(
      `/coming/get-coming/?`, {
      params
    }
    ).then(res => { callback(res.data) })
  }

  static async getThemes(callback) {
    await axios.get(
      `/coming/get-theme/`
    ).then(res => callback(res.data))
  }

  static async getStatuses(callback) {
    await axios.get(
      `/coming/get-status/`
    ).then(res => callback(res.data))
  }

  static async getCounter(callback) {
    await axios.get(
      `/coming/counter-coming/`
    ).then(res => callback(res.data))
  }

}