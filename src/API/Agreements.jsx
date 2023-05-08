import axios from "axios";

export default class Agreements {
  static async getAgreements(page, callback, params = {}) {
    await axios.get(`/agreement/agreement/?page=${page}`, { params })
      .then(res => { callback(res.data) })
  }

  static async getServices(callback) {
    await axios.get(`/agreement/service/`)
      .then(res => { callback(res.data) })
  }

  static async patchAgreement(pk, params, callback = () => { }) {
    await axios.patch(
      `/agreement/agreement/${pk}/`, params,
    ).then(res => callback(res.data))
  }

  static async removeAgreement(pk) {
    await axios.delete(`/agreement/agreement/${pk}/`)
      .then(res => { })
  }

  static async searchAgreement(params, callback) {
    await axios.get(
      `/agreement/agreement/?`, {
      params
    }
    ).then(res => { callback(res.data) })
  }

  static async getCounter(callback) {
    await axios.get(
      `/agreement/agreement/get-counter/`
    ).then(res => callback(res.data))
  }
}