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
function contactOffline(msg, clientObimp) {

    var params = {
        1: {
            name: "Account name",    // 01: UTF8, account name
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
    }

    console.log('== Contact OFFLINE');
    msg.wTLD.forEach(val => {
        let message = params[val.type];
        try {
            message.set(val.data)
        } catch (err) {
            console.error(err)
        }
    })
    console.log(params[1].value)

    clientObimp.socket.emit('contactOffline', params[1].value)
}
module.exports = contactOffline