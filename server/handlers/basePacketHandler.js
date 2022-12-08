const obimp = require('../obimp')
const TYPES = require('../types')
const srvHello = require('./common/common_srv_hello');
const srvBye = require('./common/common_srv_bye');
const srvLoginReply = require('./common/common_login_reply');
const clParamsReply = require('./client_list/cl_srv_params_reply');
const clVerifyReply = require('./client_list/cl_srv_verify_reply');
const presParamsReply = require('./presence/pres_params_reply');
const imParamsReply = require('./instant_messaging/im_rev_params_reply');
const presPresenceInfo = require('./presence/pres_info');
const srvMessage = require('./instant_messaging/srv_message');
const contactOnline = require('./presence/contact_online');
const clSrvReply = require('./client_list/cl_srv_reply');
const srvPing = require('./common/common_srv_ping')
const uaSrvParamsReply = require('./user_avatars/ua_srv_params_reply')
const imSrvDoneOffline = require('./instant_messaging/im_srv_done_offline');
const uaSrvAvatarReply = require('./user_avatars/ua_srv_avatar_reply');
const ftSrvParamsReply = require('./file_transfer/ft_srv_params_reply');
const contactOffline = require('./presence/contact_offline');

function dataHandler(data, client) {
    console.log('dataHandler handle bytes:', data.byteLength)
    obimp.parse(data).forEach(msg => {
        if (msg == undefined)
            return;
        let msgType = TYPES.OBIMP_BEX[msg.type]
        let msgSubType = msgType[msg.subtype]

        // Принимаем и проверяем ответ от сервера

        switch (msgType.name) {
            case 'OBIMP_BEX_COM':
                switch (msgSubType.name) {
                    case 'SRV_HELLO':
                        srvHello(msg, client)
                        break;
                    case 'SRV_BYE':
                        srvBye(msg, client);
                        break;
                    case 'SRV_LOGIN_REPLY':
                        srvLoginReply(msg, client);
                        break;
                    case 'CLI_SRV_KEEPALIVE_PING':
                        srvPing(msg, client);
                        break;
                    default:
                        console.error('Unhandled OBIMP_BEX_COM SubType', msgSubType.name)
                        console.error(msgSubType)
                        break;
                }
                break;
            case 'OBIMP_BEX_CL':
                switch (msgSubType.name) {
                    case 'SRV_PARAMS_REPLY':
                        clParamsReply(msg, client);
                        break;
                    case 'SRV_VERIFY_REPLY':
                        clVerifyReply(msg, client);
                        break;
                    case 'SRV_REPLY':
                        clSrvReply(msg, client);
                        break;
                    default:
                        console.error('Unhandled OBIMP_BEX_CL SubType', msgSubType.name)
                        console.error(msgSubType)
                        break;
                }
                break;
            case 'OBIMP_BEX_PRES':
                switch (msgSubType.name) {
                    case 'SRV_PARAMS_REPLY':
                        presParamsReply(msg, client);
                        break;
                    case 'SRV_PRES_INFO':
                        presPresenceInfo(msg, client)
                        break;
                    case 'SRV_CONTACT_ONLINE':
                        contactOnline(msg, client)
                        break;
                    case 'SRV_CONTACT_OFFLINE':
                        contactOffline(msg, client)
                        break;
                    default:
                        console.error('Unhandled OBIMP_BEX_PRES SubType', msgType.name, msgSubType.name)
                        break;
                }
                break;
            case 'OBIMP_BEX_IM':
                switch (msgSubType.name) {
                    case 'SRV_PARAMS_REPLY':
                        imParamsReply(msg, client)
                        break;
                    case 'SRV_MESSAGE':
                        srvMessage(msg, client)
                        break;
                    case 'SRV_DONE_OFFLINE':
                        imSrvDoneOffline(client)
                        break;
                    default:
                        console.error('Unhandled OBIMP_BEX_IM SubType', msgType.name, msgSubType.name)
                        break;
                }
                break;
            case 'OBIMP_BEX_FT':
                switch (msgSubType.name) {
                    case 'SRV_PARAMS_REPLY':
                        ftSrvParamsReply(msg, client)
                        break;
                    default:
                        console.error('Unhandled OBIMP_BEX_FT SubType', msgType.name, msgSubType.name)
                        break;
                }
                break;
            case 'OBIMP_BEX_UD':
                switch (msgSubType.name) {
                    case 'SRV_PARAMS_REPLY':
                        console.log('== TODO Users directory parameters')
                        break;
                    case 'SRV_DETAILS_REQ_REPLY':
                        console.log('== SRV_DETAILS_REQ_REPLY')
                        break;
                    default:
                        console.error('Unhandled OBIMP_BEX_UD SubType', msgType.name, msgSubType.name)
                        break;
                }
                break;
            case 'OBIMP_BEX_UA':
                switch (msgSubType.name) {
                    case 'SRV_PARAMS_REPLY':
                        uaSrvParamsReply(msg, client)
                        break;
                    case 'SRV_AVATAR_REPLY':
                        uaSrvAvatarReply(msg, client)
                        break;
                    default:
                        console.error('Unhandled OBIMP_BEX_UA SubType', msgType.name, msgSubType.name)
                        break;
                }
                break;
            default:
                console.error('Unhandled Package', msgType.name, msgSubType.name)
                break;
        }
        //client.destroy(); // Close the client socket completely
    });
}

function errorHandler(err,clientObimp) {
    console.error(err.message)
    clientObimp.socket.emit('error', err.message)
}

function closeHandler() {
    console.log('Connection closed');
}

module.exports = { dataHandler, errorHandler, closeHandler }