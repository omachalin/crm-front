import fetcher from "../fetcher";
import qs from "qs"

export default class Cashbox {
  static async getCashbox(params = {}, callback) {
    const normalizeParams = qs.stringify(params, {arrayFormat: "repeat"})
    await fetcher.get(`/cashbox/cashbox/?${normalizeParams}`)
      .then(res => { callback(res.data) })
  }

  static async addCashbox(params, callback) {
    await fetcher.post(`/cashbox/cashbox/`, params)
      .then(res => { callback(res.data) })
  }

  static async getTypePayments(callback) {
    await fetcher.get(`/cashbox/type-payment/`)
      .then(res => { callback(res.data) })
  }

  static async addMoney(params, callback) {
    await fetcher.post(`/cashbox/cashbox/add-payment-agreement/`, params)
      .then(res => { callback(res.data) })
  }

  static async removePayement(pk, callback) {
    await fetcher.delete(`/cashbox/cashbox/${pk}/`)
      .then(res => { console.log(res); callback(res.data) })
  }

  static async getTypesMoney(callback) {
    await fetcher.get(`/cashbox/type-money/`)
      .then(res => { callback(res.data) })
  }

  static async getCounter(callback) {
    await fetcher.get(
      `/cashbox/cashbox/get-counter/`
    ).then(res => callback(res.data))
  }
}