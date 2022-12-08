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
function srvMessage(msg, clientObimp) {
    let params = {
        1: {
            name: "Account name of message sender",
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        2: {
            name: "Unique message ID",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.readUInt32BE()
            }
        },
        3: {
            name: "Message type",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.readUInt32BE()
            }
        },
        4: {
            name: "Message data",
            value: null,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        5: {
            name: "Request message delivery report from remote client",
            value: null,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val
            }
        },
        6: {
            name: "Encryption type (see corresponding BEX for types)",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.readInt32BE()
            }
        },

    }
    console.log('== NEW MESSAGE');
    msg.wTLD.forEach(val => {
        let message = params[val.type];
        message.set(val.data)
        console.log(`   ${message.name}`, message.value);
    })
    clientObimp.socket.emit('srvMessage', {
        account: params[1].value,
        id: params[2].value,
        message: params[4].value
    })
}

module.exports = srvMessage