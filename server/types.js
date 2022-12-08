const OBIMP_BEX = {
    1: {
        name: "OBIMP_BEX_COM",
        1: { name: "CLI_HELLO", type: 'cli' },
        2: { name: "SRV_HELLO", type: 'srv' },
        3: { name: "CLI_LOGIN", type: 'cli' },
        4: { name: "SRV_LOGIN_REPLY", type: 'srv' },
        5: { name: "SRV_BYE", type: 'srv' },
        6: { name: "CLI_SRV_KEEPALIVE_PING", type: 'cli_srv' },
        7: { name: "CLI_SRV_KEEPALIVE_PONG", type: 'cli_srv' },
        8: { name: "CLI_REGISTER", type: 'cli' },
        9: { name: "SRV_REGISTER_REPLY", type: 'srv' }
    },
    2: {
        name: "OBIMP_BEX_CL",
        1: { name: "CLI_PARAMS", type: 'cli' },
        2: { name: "SRV_PARAMS_REPLY", type: 'srv' },
        3: { name: "CLI_REQUEST", type: 'cli' },
        4: { name: "SRV_REPLY", type: 'srv' },
        5: { name: "CLI_VERIFY", type: 'cli' },
        6: { name: "SRV_VERIFY_REPLY", type: 'srv' },
        7: { name: "CLI_ADD_ITEM", type: 'cli' },
        8: { name: "SRV_ADD_ITEM_REPLY", type: 'srv' },
        9: { name: "CLI_DEL_ITEM", type: 'cli' },
        10: { name: "SRV_DEL_ITEM_REPLY", type: 'srv' },
        11: { name: "CLI_UPD_ITEM", type: 'cli' },
        12: { name: "SRV_UPD_ITEM_REPLY", type: 'srv' },
        13: { name: "CLI_SRV_AUTH_REQUEST", type: 'cli' },
        14: { name: "CLI_SRV_AUTH_REPLY", type: 'cli' },
        15: { name: "CLI_SRV_AUTH_REVOKE", type: 'cli' },
        16: { name: "CLI_REQ_OFFAUTH", type: 'cli' },
        17: { name: "SRV_DONE_OFFAUTH", type: 'srv' },
        18: { name: "CLI_DEL_OFFAUTH", type: 'cli' },
        19: { name: "SRV_ITEM_OPER", type: 'srv' },
        20: { name: "SRV_BEGIN_UPDATE", type: 'srv' },
        21: { name: "SRV_END_UPDATE", type: 'srv' }
    },
    3: {
        name: "OBIMP_BEX_PRES",
        1: { name: "CLI_PARAMS", type: 'cli' },
        2: { name: "SRV_PARAMS_REPLY", type: 'srv' },
        3: { name: "CLI_SET_PRES_INFO", type: 'cli' },
        4: { name: "CLI_SET_STATUS", type: 'cli' },
        5: { name: "CLI_ACTIVATE", type: 'cli' },
        6: { name: "SRV_CONTACT_ONLINE", type: 'srv' },
        7: { name: "SRV_CONTACT_OFFLINE", type: 'srv' },
        8: { name: "CLI_REQ_PRES_INFO", type: 'cli' },
        9: { name: "SRV_PRES_INFO", type: 'srv' },
        10: { name: "SRV_MAIL_NOTIF", type: 'srv' },
        11: { name: "CLI_REQ_OWN_MAIL_URL", type: 'cli' },
        12: { name: "SRV_OWN_MAIL_URL", type: 'srv' }
    },
    4: {
        name: "OBIMP_BEX_IM",
        1: { name: "CLI_PARAMS", type: 'cli' },
        2: { name: "SRV_PARAMS_REPLY", type: 'srv' },
        3: { name: "CLI_REQ_OFFLINE", type: 'cli' },
        4: { name: "SRV_DONE_OFFLINE", type: 'srv' },
        5: { name: "CLI_DEL_OFFLINE", type: 'cli' },
        6: { name: "CLI_MESSAGE", type: 'cli' },
        7: { name: "SRV_MESSAGE", type: 'srv' },
        8: { name: "CLI_SRV_MSG_REPORT", type: 'cli' },
        9: { name: "CLI_SRV_NOTIFY", type: 'cli' },
        10: { name: "CLI_SRV_ENCRYPT_KEY_REQ", type: 'cli' },
        11: { name: "CLI_SRV_ENCRYPT_KEY_REPLY", type: 'cli' },
        12: { name: "CLI_MULTIPLE_MSG", type: 'cli' }
    },
    5: {
        name: "OBIMP_BEX_UD",
        0x0001: { name: "CLI_PARAMS", type: 'cli' },
        0x0002: { name: "SRV_PARAMS_REPLY", type: 'srv' },
        0x0003: { name: "CLI_DETAILS_REQ", type: 'cli' },
        0x0004: { name: "SRV_DETAILS_REQ_REPLY", type: 'srv' },
        0x0005: { name: "CLI_DETAILS_UPD", type: 'cli' },
        0x0006: { name: "SRV_DETAILS_UPD_REPLY", type: 'srv' },
        0x0007: { name: "CLI_SEARCH", type: 'cli' },
        0x0008: { name: "SRV_SEARCH_REPLY", type: 'srv' },
        0x0009: { name: "CLI_SECURE_UPD", type: 'cli' },
        0x000A: { name: "SRV_SECURE_UPD_REPLY", type: 'srv' }
    },
    6: {
        name: "OBIMP_BEX_UA",
        0x0001: { name: "CLI_PARAMS", type: 'cli' },
        0x0002: { name: "SRV_PARAMS_REPLY", type: 'srv' },
        0x0003: { name: "CLI_AVATAR_REQ", type: 'cli' },
        0x0004: { name: "SRV_AVATAR_REPLY", type: 'srv' },
        0x0005: { name: "CLI_AVATAR_SET", type: 'cli' },
        0x0006: { name: "SRV_AVATAR_SET_REPLY", type: 'srv' }
    },
    7: {
        name: "OBIMP_BEX_FT",
        0x0001: { name: "CLI_PARAMS", type: 'cli' },
        0x0002: { name: "SRV_PARAMS_REPLY", type: 'srv' },
        0x0003: { name: "CLI_SRV_SEND_FILE_REQUEST", type: 'cli' },
        0x0004: { name: "CLI_SRV_SEND_FILE_REPLY", type: 'cli' },
        0x0005: { name: "CLI_SRV_CONTROL", type: 'cli' },
        0x0101: { name: "DIR_PROX_ERROR", type: 'dir' },
        0x0102: { name: "DIR_PROX_HELLO", type: 'dir' },
        0x0103: { name: "DIR_PROX_FILE", type: 'dir' },
        0x0104: { name: "DIR_PROX_FILE_REPLY", type: 'dir' },
        0x0105: { name: "DIR_PROX_FILE_DATA", type: 'dir' }
    },
    8: {
        name: "OBIMP_BEX_TP",
        0x0001: { name: "CLI_PARAMS", type: 'cli' },
        0x0002: { name: "SRV_PARAMS_REPLY", type: 'srv' },
        0x0003: { name: "SRV_ITEM_READY", type: 'srv' },
        0x0004: { name: "CLI_SETTINGS", type: 'cli' },
        0x0005: { name: "SRV_SETTINGS_REPLY", type: 'srv' },
        0x0006: { name: "CLI_MANAGE", type: 'cli' },
        0x0007: { name: "SRV_TRANSPORT_INFO", type: 'srv' },
        0x0008: { name: "SRV_SHOW_NOTIF", type: 'srv' },
        0x0009: { name: "SRV_OWN_AVATAR_HASH", type: 'srv' }
    },
    9: {
        name: "Admin Command",
        1: { name: "CLI_PARAMS", type: 'cli' },
        2: { name: "SRV_PARAMS_REPLY", type: 'srv' }
    }
}

const BYE_CODES = {
    1: 'BYE_REASON_SRV_SHUTDOWN',
    2: 'BYE_REASON_CLI_NEW_LOGIN',
    3: 'BYE_REASON_ACCOUNT_KICKED',
    4: 'BYE_REASON_INCORRECT_SEQ',
    5: 'BYE_REASON_INCORRECT_BEX_TYPE',
    6: 'BYE_REASON_INCORRECT_BEX_SUB',
    7: 'BYE_REASON_INCORRECT_BEX_STEP',
    8: 'BYE_REASON_TIMEOUT',
    9: 'BYE_REASON_INCORRECT_WTLD',
    10: 'BYE_REASON_NOT_ALLOWED',
    11: 'BYE_REASON_FLOODING',
}

const LOGIN_ERROR_CODE = {
    1: 'LOGIN_ERROR_ACCOUNT_INVALID',
    2: 'LOGIN_ERROR_SERVICE_TEMP_UNAVAILABLE',
    3: 'LOGIN_ERROR_ACCOUNT_BANNED',
    4: 'LOGIN_ERROR_WRONG_PASSWORD',
    5: 'LOGIN_ERROR_INVALID_LOGIN',
}

const HELLO_ERROR_CODE = {
    1: "HELLO_ERROR_ACCOUNT_INVALID",
    2: "HELLO_ERROR_SERVICE_TEMP_UNAVAILABLE",
    3: "HELLO_ERROR_ACCOUNT_BANNED",
    4: "HELLO_ERROR_WRONG_COOKIE",
    5: "HELLO_ERROR_TOO_MANY_CLIENTS",
    6: "HELLO_ERROR_INVALID_LOGIN",
}

const PRES_STATUS = {
     0 :"PRES_STATUS_ONLINE",
     1 :"PRES_STATUS_INVISIBLE",
     2 :"PRES_STATUS_INVISIBLE_FOR_ALL",
     3 :"PRES_STATUS_FREE_FOR_CHAT",
     4 :"PRES_STATUS_AT_HOME",
     5 :"PRES_STATUS_AT_WORK",
     6 :"PRES_STATUS_LUNCH",
     7 :"PRES_STATUS_AWAY",
     8 :"PRES_STATUS_NOT_AVAILABLE",
     9 :"PRES_STATUS_OCCUPIED",
     10 :"PRES_STATUS_DO_NOT_DISTURB",
}
module.exports = {
    OBIMP_BEX,
    BYE_CODES,
    LOGIN_ERROR_CODE,
    HELLO_ERROR_CODE,
    PRES_STATUS
}