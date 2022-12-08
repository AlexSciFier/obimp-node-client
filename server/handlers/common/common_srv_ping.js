const obimp = require('../../obimp')

function srvPing(msg, clientObimp) {
    console.log('== Ping')
    let packet = obimp.serialize(clientObimp.sequence++, 1, 7, 0, [])
    console.log('-> Pong')
    clientObimp.client.write(packet)
}
module.exports = srvPing;