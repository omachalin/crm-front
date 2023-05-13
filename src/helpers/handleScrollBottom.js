
export const handleScrollBottom = (handller) => (e) => {
  if (e.target.offsetHeight + e.target.scrollTop + 100 >= e.target.scrollHeight) {
    handller()
  }
}