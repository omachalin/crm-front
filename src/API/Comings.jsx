import fetcher from "../fetcher";

export default class Comings {

  static async getClients(page = 1, callback, params = {}) {
    await fetcher.get(
      `coming/get-coming/get_coming_with_client/?page=${page}`, {
      params
    }).then(res => { callback(res.data) }
    )
  }

  static async addClient(params, callback) {
    await fetcher.post(
      `/client/client/`, params
    ).then(res => callback(res.data))
  }

  static async addComing(params, callback) {
    await fetcher.post(
      `/coming/get-coming/`, params
    ).then(res => callback(res.data))
  }

  static async cloneClient(pk, callback) {
    await fetcher.put(
      `/coming/coming-clone/${pk}/`
    ).then(res => callback(res.data))
  }

  static async removeComing(pk) {
    await fetcher.delete(
      `/coming/get-coming/${pk}/`,
    )
  }

  static async patchClient(pk, params, callback) {
    await fetcher.patch(
      `/client/client/${pk}/`, params
    ).then(res => callback(res.data))
  }

  static async patchComing(pk, params, callback = () => { }) {
    await fetcher.patch(
      `/coming/get-coming/${pk}/`, params
    ).then(res => { console.log(res); callback(res.data) })
  }

  static async searchClient(params, callback) {
    await fetcher.get(
      `/coming/get-coming/?`, {
      params
    }
    ).then(res => { callback(res.data) })
  }

  static async getThemes(callback) {
    await fetcher.get(
      `/coming/get-theme/`
    ).then(res => callback(res.data))
  }

  static async getStatuses(callback) {
    await fetcher.get(
      `/coming/get-status/`
    ).then(res => callback(res.data))
  }

  static async getCounter(callback) {
    await fetcher.get(
      `/coming/counter-coming/`
    ).then(res => callback(res.data))
  }

}