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

export { validateTitle, validateDescription }
