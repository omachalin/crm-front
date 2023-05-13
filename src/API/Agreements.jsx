import fetcher from "../fetcher";

export default class Agreements {
  static async getAgreements(page, callback, params = {}) {
    await fetcher.get(`/agreement/agreement/?page=${page}`, { params })
      .then(res => { callback(res.data) })
  }

  static async getServices(callback) {
    await fetcher.get(`/agreement/service/`)
      .then(res => { callback(res.data) })
  }

  static async patchAgreement(pk, params, callback = () => { }) {
    await fetcher.patch(
      `/agreement/agreement/${pk}/`, params,
    ).then(res => callback(res.data))
  }

  static async removeAgreement(pk) {
    await fetcher.delete(`/agreement/agreement/${pk}/`)
      .then(res => { })
  }

  static async searchAgreement(params, callback) {
    await fetcher.get(
      `/agreement/agreement/?`, {
      params
    }
    ).then(res => { callback(res.data) })
  }

  static async getCounter(callback) {
    await fetcher.get(
      `/agreement/agreement/get-counter/`
    ).then(res => callback(res.data))
  }
}