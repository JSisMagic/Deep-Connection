//final-react-project/final-project/src/common/validation-enums.js

export const validation = {

    MIN_FIRSTNAME_LENGTH: 1,
    MAX_FIRSTNAME_LENGTH: 30,
    MIN_LASTNAME_LENGTH: 1,
    MAX_LASTNAME_LENGTH: 30,
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 30,
    MIN_EMAIL_LENGTH: 6,
    MAX_EMAIL_LENGTH: 32,
    MIN_PHONE_NUM_LENGTH: 10,
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 30,
    PASSWORD_COMPLEXITY: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/,
    PHONE_FORMAT: /^\d+$/,
    NAME_FORMAT: /^[a-zA-Z]+$/,
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 30,
    MAX_ADDITIONAL_INFO_LENGTH: 500,

    WEEK_DAYS_COUNT: 7,
    WORK_WEEK_DAYS_COUNT: 5,
    NUM_WEEKS_IN_ONE_YEAR: 52,
    NUM_MONTHS_IN_ONE_YEAR: 12,
    NUM_YEARS_TO_REPEAT_EVENT: 2,

};

export default validation;