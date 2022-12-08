const obimp = require('../../obimp');

const contactListParams = {
    1: {
        name: "Maximal groups count",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    2: {
        name: "Maximal UTF-8 encoded group name length",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    3: {
        name: "Maximal contacts count all over contact list",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    4: {
        name: "Maximal UTF-8 encoded account name length",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    5: {
        name: "Maximal UTF-8 encoded contact name / transport friendly name length",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    6: {
        name: "Maximal UTF-8 encoded authorization reason / revoke length",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    7: {
        name: "Maximal user / developer sTLDs count in one item",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    8: {
        name: "Maximal user / developer sTLD length",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    9: {
        name: "Offline authorization messages(requests, replies, revokes) count waiting for client request",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    10: {
        name: "If True then server will automatically remove authorization flag after adding contact",
        value: false,
        set(val) {
            this.value = val[0] ? true : false
        }
    },
    11: {
        name: "Maximal notes count",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    12: {
        name: "Maximal UTF-8 encoded note name length",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
    13: {
        name: "Maximal UTF-8 encoded note text length",
        value: 0,
        set(val) {
            this.value = val.readUInt32BE()
        }
    },
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
function clParamsReply(msg, clientObimp) {
    console.log('== Contact list parameters and limits')
    msg.wTLD.forEach(value => {
        let param = contactListParams[value.type]
        param.set(value.data)
        console.log(param.name, param.value)
    })

    sendInitSequence(msg, clientObimp);
}

function sendInitSequence(msg, clientObimp) {
    let initSeq = [
        {
            type: 3,//BEX 0x0003, Presence (OBIMP_BEX_PRES)
            subtype: 1
        },
        {
            type: 4,//BEX 0x0004, Instant messaging (OBIMP_BEX_IM)
            subtype: 1
        },
        {
            type: 5,//BEX 0x0005, Users directory (OBIMP_BEX_UD)
            subtype: 1
        },
        {
            type: 6,//BEX 0x0006, User avatars (OBIMP_BEX_UA)
            subtype: 1
        },
        {
            type: 7,//BEX 0x0007, File transfer (OBIMP_BEX_FT)
            subtype: 1
        },
        {
            type: 8,//BEX 0x0008, Transports (OBIMP_BEX_TP)
            subtype: 1
        },
        {
            type: 3,//BEX 0x0003, Presence (OBIMP_BEX_PRES)
            subtype: 8//Subtype: 0x0008. (OBIMP_BEX_PRES_CLI_REQ_PRES_INFO)
        },
        {
            type: 2,//BEX 0x0002, Contact list. (OBIMP_BEX_CL)
            subtype: 5//Subtype: 0x0005. (OBIMP_BEX_CL_CLI_VERIFY)
        },
    ]
    console.log('-> SENDING INIT SEQ')
    initSeq.forEach(val => {
        let packet = obimp.serialize(clientObimp.sequence++, val.type, val.subtype, 0, []);
        console.log('-> SENDING', packet.toString('hex'))
        clientObimp.client.write(packet);
    })
}

module.exports = clParamsReply;