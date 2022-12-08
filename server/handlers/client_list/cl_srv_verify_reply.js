const obimp = require('../../obimp')

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
function clVerifyReply(msg, clientObimp) {
    console.log('== OBIMP_BEX_CL_CLI_VERIFY');

    let serverHash = msg.wTLD[0].data.toString('hex');
    let clientHash = clientObimp.clHash;

    console.log('Server hash', serverHash);
    console.log('Client hash', clientHash);

    if (serverHash !== clientHash) {
        sendGetClientList(clientObimp)
    }

    sendPresInfo(msg, clientObimp);
}

function sendGetClientList(clientObimp) {
    //BEX 0x0002, Contact list. (OBIMP_BEX_CL)
    //Subtype: 0x0003. (OBIMP_BEX_CL_CLI_REQUEST)
    console.log('-> REQUESTING NEW CONTACT LIST')
    let packet = obimp.serialize(clientObimp.sequence++, 2, 3, 0, []);
    clientObimp.client.write(packet)
}

function sendPresInfo(msg, clientObimp) {
    let sequence = clientObimp.sequence + 1;
    console.log('-> SENDING PRES INFO')
    let bex = {
        seq: sequence,
        type: 3,
        subtype: 3,
        req: 0,
        wTLD: [
            {
                type: 1,
                data: Buffer.from('000100050006000700080009000A', 'hex')
            },
            {
                type: 2,
                data: Buffer.from([0x00, 0x01], 0, 2)
            },
            {
                type: 3,
                data: Buffer.from('NodeClient')
            },
            {
                type: 4,
                data: Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01], 0, 8)
            },
            {
                type: 5,
                data: Buffer.from([0x00, 0x52], 0, 2)
            }
        ]
    }
    console.log(bex.wTLD)
    let packet = obimp.serialize(clientObimp.sequence++, bex.type, bex.subtype, bex.req, bex.wTLD);
    clientObimp.client.write(packet);

    sequence++;
    let statusBex = {
        seq: sequence,
        type: 3,
        subtype: 4,
        req: 0,
        wTLD: [
            {
                type: 1,
                data: Buffer.from([0x00, 0x00, 0x00, 0x00], 0, 4)
            },
            {
                type: 2,
                data: Buffer.from('В сети')
            },
        ]
    }
    console.log(statusBex.wTLD)
    packet = obimp.serialize(clientObimp.sequence++, statusBex.type, statusBex.subtype, statusBex.req, statusBex.wTLD);
    clientObimp.client.write(packet);

    sequence++;
    let activateBex = {
        seq: sequence,
        type: 3,
        subtype: 5,
        req: 0,
        wTLD: []
    }
    console.log(activateBex.wTLD)
    packet = obimp.serialize(clientObimp.sequence++, activateBex.type, activateBex.subtype, activateBex.req, activateBex.wTLD);
    clientObimp.client.write(packet);

    sequence++;
    let detailsBex = {
        seq: sequence,
        type: 5,
        subtype: 3,
        req: 0,
        wTLD: [
            {
                type: 1,
                data: Buffer.from('192.168.0.3')
            }
        ]
    }
    console.log(detailsBex.wTLD)
    packet = obimp.serialize(clientObimp.sequence++, detailsBex.type, detailsBex.subtype, detailsBex.req, detailsBex.wTLD);
    clientObimp.client.write(packet);

}
module.exports = clVerifyReply;