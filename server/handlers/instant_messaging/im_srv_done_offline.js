const obimp = require('../../obimp')

function imSrvDoneOffline(clientObimp) {
    console.log('== SRV_DONE_OFFLINE')
    console.log('-> OBIMP_BEX_IM_CLI_DEL_OFFLINE')
    let packet = obimp.serialize(clientObimp.sequence++, 4, 5, 0, [])// BEX 0x0004, Instant messaging (OBIMP_BEX_IM) Subtype: 0x0005. (OBIMP_BEX_IM_CLI_DEL_OFFLINE)
    clientObimp.client.write(packet)
}

module.exports = imSrvDoneOffline