const LOGIN_ERROR_CODES = {
    LOGIN_ERROR_ACCOUNT_INVALID: "Аккаунт не существует",
    LOGIN_ERROR_SERVICE_TEMP_UNAVAILABLE: "Сервис временно недоступен",
    LOGIN_ERROR_ACCOUNT_BANNED: "Ваш аккаунт заблокирован",
    LOGIN_ERROR_WRONG_PASSWORD: "Неверный пароль",
    LOGIN_ERROR_INVALID_LOGIN: "Неверный логин",
    HELLO_ERROR_ACCOUNT_INVALID: "Аккаунт не существует",
    HELLO_ERROR_SERVICE_TEMP_UNAVAILABLE: "Сервис временно недоступен",
    HELLO_ERROR_ACCOUNT_BANNED: "Ваш аккаунт заблокирован",
    HELLO_ERROR_WRONG_COOKIE: "Неверный coockie",
    HELLO_ERROR_TOO_MANY_CLIENTS: "Слишком много подключений",
    HELLO_ERROR_INVALID_LOGIN: "Неверный логин",

}

const BYE_CODES = {
    BYE_REASON_SRV_SHUTDOWN: "Сервер отключился",
    BYE_REASON_CLI_NEW_LOGIN: "Произошол вход с нового устройства",
    BYE_REASON_ACCOUNT_KICKED: "Вы были исключены с серверв",
    BYE_REASON_INCORRECT_SEQ: "Ошибка передачи данных",
    BYE_REASON_INCORRECT_BEX_TYPE: "",
    BYE_REASON_INCORRECT_BEX_SUB: "",
    BYE_REASON_INCORRECT_BEX_STEP: "",
    BYE_REASON_TIMEOUT: "Время соединения вышло",
    BYE_REASON_INCORRECT_WTLD: "",
    BYE_REASON_NOT_ALLOWED: "",
    BYE_REASON_FLOODING: "",
}
export { LOGIN_ERROR_CODES, BYE_CODES }