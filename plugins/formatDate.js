export default function formatDate(date) {
  date = date instanceof Date ? date : new Date(date)
  const padding = n => ('0000' + n).slice(-2)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  return `${year}-${padding(month)}-${padding(day)}`
}
