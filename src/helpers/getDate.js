export const getTime = (date) => {
  let dateTime = new Date(date)
  let hourses = dateTime.getHours().toString()
  let minutes = dateTime.getMinutes().toString()
  if (minutes.length === 1) minutes = `0${minutes}`
  if (hourses.length === 1) hourses = `0${hourses}`
  return `${hourses}:${minutes}`
}

export const getDate = (date) => {
  return (new Date(date).toLocaleString("ru", {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
  }));
}
