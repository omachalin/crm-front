import axios from 'axios';
const settings = require("../settings.json");

export default class Personal {

  static async getPersonal(callback, department = 'upp') {
    await axios.get(
      `personal/get-personal/?department_fk=${settings.comings.department[department]}&status_fk=${settings.person.statuses.working}`
    ).then(res => callback(res.data?.results))
  }

}
