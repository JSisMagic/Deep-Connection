import { differenceInCalendarDays, differenceInDays, isBefore } from "date-fns"
import { dayCount, eventRepetitions } from "./constrants"
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

  if (endDateInMs <= startDateInMs) {
    isDateValid = false
    key = "endDate"
    message = errorMessages.INVALID_END_DATE
  }

  return { isDateValid, key, message }
}

const hasRepetitionToday = (date, event) => {
  const { startDate, endDate, repeat } = event

  if (isBefore(date, startDate) || repeat === eventRepetitions.never) return

  const eventDurationInDays = differenceInDays(endDate, startDate)
  const daysSinceStart = differenceInCalendarDays(date, startDate)

  if (daysSinceStart % dayCount[repeat] === 0) return true
  if (daysSinceStart % dayCount[repeat] <= eventDurationInDays) return true
}

const dateISOTimezoneAdjust = date =>
  date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, -8)
    : null

export {
  dateISOTimezoneAdjust,
  validateDates,
  validateDescription,
  validateTitle,
  hasRepetitionToday,
}
