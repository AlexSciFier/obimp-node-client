const TYPES = require('../../types');

function srvBye(msg, clientObimp) {
    console.log('Server bye')
    let byeReason = msg.wTLD[0].data.readUInt16BE(0)
    console.log(TYPES.BYE_CODES[byeReason])
    clientObimp.socket.emit('srvBye', TYPES.BYE_CODES[byeReason])
}
module.exports = srvBye;