import errorMessages from "./error-messages"
import validation from "./validation-enums"

const validateTitle = value => {
  return value.length >= validation.MIN_TITLE_LENGTH && value.length <= validation.MAX_TITLE_LENGTH
}
const validateDescription = htmlValue => {
  const value = htmlValue ? htmlValue.match(/(?<=>)(.*\n?)(?=<)/)[1] : ""

  return (
    value.length >= validation.MIN_ADDITIONAL_INFO_LENGTH &&
    value.length <= validation.MAX_ADDITIONAL_INFO_LENGTH
  )
}

const validateDates = (startDate, endDate) => {
  let isDateValid = true
  let key = ""
  let message = ""

  const startDateInMs = startDate.getTime()
  const endDateInMs = endDate.getTime()

  if (endDateInMs < startDateInMs) {
    isDateValid = false
    key = "endDate"
    message = errorMessages.INVALID_END_DATE
  }

  return { isDateValid, key, message }
}

const dateISOTimezoneAdjust = date =>
  date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, -8)
    : null

export { dateISOTimezoneAdjust, validateDates, validateDescription, validateTitle }

