const obimp = require('../../obimp')

function sendOfflineMessagesRequest(clientObimp) {
    console.log('-> OBIMP_BEX_IM_CLI_REQ_OFFLINE')
    let packet = obimp.serialize(clientObimp.sequence++, 4, 3, 0, [])// BEX 0x0004, Instant messaging (OBIMP_BEX_IM) Subtype: 0x0003. (OBIMP_BEX_IM_CLI_REQ_OFFLINE)
    clientObimp.client.write(packet)
}
/**
 * 
 * @param {{
 * sequence: Number;
 * type: Number;
 *  subtype: Number;
 *  request: Number;
 *  size: Number;
 *  data: String;
 *  wTLD: [{
 *      type: Number;
 *      length: Number;
 *      data: Buffer;
 * }];
 * }} msg 
 */
function imParamsReply(msg, clientObimp) {
    var params = {
        1: {
            name: 'maximal UTF-8 encoded account name length',
            value: 0,
            set(val) {
                this.value = val.readUInt32BE()
            }
        },
        2: {
            name: 'maximal message data length',
            value: 0,
            set(val) {
                this.value = val.readUInt32BE()
            }
        },
        3: {
            name: 'offline messages count waiting for client request',
            value: 0,
            set(val) {
                this.value = val.readUInt32BE()
            }
        },
        4: {
            name: 'if True then client can send multiple message BEX',
            value: false,
            set(val) {
                this.value = val[0] ? true : false
            }
        },
    }

    console.log('== SRV_PARAMS_REPLY')
    msg.wTLD.forEach(val => {
        params[val.type].set(val.data)
        console.log(params[val.type].name, params[val.type].value)
    })

    if (params[3].value > 0)
        sendOfflineMessagesRequest(clientObimp)
}

module.exports = imParamsReply