import axios from "axios";

export default class Cashbox {
  static async getTypePayments(callback) {
    await axios.get(`/cashbox/type-payment/`)
      .then(res => { callback(res.data) })
  }

  static async addMoney(params, callback) {
    await axios.post(`/cashbox/cashbox/add-payment-agreement/`, params)
      .then(res => { callback(res.data) })
  }

  static async removePayement(pk, callback) {
    await axios.delete(`/cashbox/cashbox/${pk}/`)
      .then(res => { console.log(res); callback(res.data) })
  }
}