import fetcher from '../fetcher';
const settings = require("../settings.json");

export default class Personal {

  static async getPersonal(callback, department_fk, status_fk) {
    await fetcher.get(
      `personal/get-personal/?department_fk=${department_fk}&status_fk=${status_fk}`
    ).then(res => callback(res.data?.results))
  }

}
