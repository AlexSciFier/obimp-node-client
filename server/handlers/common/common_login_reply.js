const TYPES = require('../../types');
const obimp = require('../../obimp');

function srvLoginReply(msg,clientObimp) {

    console.log('-> Login reply')
    if (msg.wTLD[0].type == 1) {
        console.error('Login error')
        let errorCode = msg.wTLD[0].data.readUInt16BE(0);
        console.error(TYPES.LOGIN_ERROR_CODE[errorCode])
        clientObimp.socket.emit('srvLoginReply', {
            error: true,
            errorCode: TYPES.LOGIN_ERROR_CODE[errorCode]
        })
        return;
    } else {
        msg.wTLD.forEach(value => {
            switch (value.type) {
                case 2:
                    console.log('Supported BEX', value.data)
                    break;
                case 3:
                    console.log('Maximal client BEXs data length', value.data.readUInt32BE())
                    break;
                case 8:
                    console.log('BEX versions', value.data)
                    break;
                default:
                    break;
            }
        })

        clientObimp.socket.emit('srvLoginReply', {
            error: false
        })

        console.log('-> SENDING REQUEST CL')
        var cliParams = obimp.serialize(clientObimp.sequence++, 2, 1, 0, []);
        clientObimp.client.write(cliParams);
    }
}

module.exports = srvLoginReply