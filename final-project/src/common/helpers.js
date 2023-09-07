import validation from "./validation-enums"

const validateTitle = value => {
  return value.length >= validation.MIN_TITLE_LENGTH && value.length <= validation.MAX_TITLE_LENGTH
}
const validateDescription = htmlValue => {
  const value = htmlValue.match(/(?<=>)(.*\n?)(?=<)/)[1]

  return (
    value.length >= validation.MIN_ADDITIONAL_INFO_LENGTH &&
    value.length <= validation.MAX_ADDITIONAL_INFO_LENGTH
  )
}

const dateISOTimezoneAdjust = date =>
  date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, -8)
    : null

export { validateTitle, validateDescription, dateISOTimezoneAdjust }
