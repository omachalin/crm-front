export const getInitials = (name) => {
  const arr = name.split(' ');
  if (arr.length < 3 ) return name;

  const initials = arr.slice(1).map((v) => `${v[0]}.`).join(' ');
  return `${arr[0]} ${initials}`
}