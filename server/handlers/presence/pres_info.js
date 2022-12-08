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
function presPresenceInfo(msg, clientObimp) {
    let params = {
        1: {
            name: "UserName",
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
            name: "RegistrationDate",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = new Date(val.readBigInt64BE().toString(10) * 1000)
            }
        },
        3: {
            name: "SessionDate",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = new Date(val.readBigInt64BE().toString(10) * 1000)
            }
        },
        4: {
            name: "LastSessionDate",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = new Date(val.readBigInt64BE().toString(10) * 1000)
            }
        },
        5: {
            name: "IP",
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        6: {
            name: "LastIP",
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        7: {
            name: "SignedCount",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.readUInt16BE()
            }
        },
        8: {
            name: "Description",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        100: {
            name: "PresenceInfo",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('hex')
            }
        }
    }
    console.log('== OBIMP_BEX_PRES_SRV_PRES_INFO')
    msg.wTLD.forEach(value => {
        let param = params[value.type];
        param.set(value.data)
        console.log(`   ${param.name}`, param.value);
    })
    let infoToSend = {
        username:params[1].value,
        registationDate:params[2].value,
        sessionDate:params[3].value,
        lastSessionDate:params[4].value,
        ip:params[5].value
    }
    clientObimp.socket.emit('presPresenceInfo', infoToSend)
}

module.exports = presPresenceInfo