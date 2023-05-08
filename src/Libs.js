export class Libs {
  static getRusDate(date) {
    return (new Date(date).toLocaleString("ru", {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC'
    }));
  }

  static getRusDateTime(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const russianDate = `
      ${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}
      ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}
    `;
    return russianDate
  }

  static getSpaceNumber(integer) {
    return integer !== undefined ? integer.toLocaleString() : ''
  }
}
