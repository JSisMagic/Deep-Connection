//final-react-project/final-project/src/common/error-messages.js

export const errorMessages = {

    FIRST_NAME_LETTERS_ERROR: "First name must contain only letters.",
    FIRST_NAME_ERROR: "First Name must be between 1 and 30 symbols.",

    LAST_NAME_LETTERS_ERROR: "Last name must contain only letters.",
    LAST_NAME_ERROR: "Last Name must be between 1 and 30 symbols.",

    USER_NOT_EXISTS: "User with this email doesn't exist!",
    USER_EXISTS: "This username already exists!",
    USERNAME_LEN_ERROR: "Username must be between 1 and 15 symbols.",
    USERNAME_TAKEN_ERROR: "This username is already taken.",

    PHONE_EXISTS: "This phone already exists!",
    PHONE_FORMAT_ERROR: "The phone number must contain digits only, and its length must be 10.",
    PHONE_TAKEN_ERROR: "A user is registered with this phone number.",
    PHONE_LENGTH: "Phone number must have 10 digit!",
    ONLY_DIGITS: "This field number must have only digits!",

    INVALID_EMAIL: "Invalid email!",
    //EMAIL_EXISTS: "This email already exists!",
    EMAIL_USED_ERROR: "This email address is already used.",
    SOMETHING_WENT_WRONG: "Something went wrong!",
    ENTER_CORRECT_DATA: "Еnter the correct email and password!",

    INVALID_DATA: "Please enter valid information!",
    ONLY_LETTERS: "This field must contains only uppercase and lowercase letters!",
    INPUT_VALUE: "Input a value!",

    WRONG_PASSWORD: "Wrong password!",
    PASSWORD_MATCH_ERROR: "The passwords do not match. Please make sure you repeat your password correctly.",
    PASSWORD_COMPLEXITY_ERROR: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    PASSWORD_LEN_ERROR: "Password must be between 8 and 30 symbols.",

    AVATAR_ERROR: "Please select a JPEG under 1MB.",
    INVALID_END_DATE: "End date should be after start date!"
}

export default errorMessages;
