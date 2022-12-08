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
function ftSrvParamsReply(msg,clientObimp) {
    const params = {
        1: {
            name: "LongWord, maximal UTF-8 encoded account name length",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.getLongWord()
            }
        },
        2: {
            name: "LongWord, maximal UTF-8 encoded host/IP length",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.getLongWord()
            }
        },
        3: {
            name: "LongWord, maximal UTF-8 encoded file name length",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.getLongWord()
            }
        },
        4: {
            name: "LongWord, maximal UTF-8 encoded file path length",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.getLongWord()
            }
        },
        5: {
            name: "Bool, if value is True then FT support is enabled",
            value: false,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = !!val.readInt8()
            }
        },
        6: {
            name: "Bool, if value is True then proxied file transfer support is enabled",
            value: false,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = !!val.readInt8()
            }
        },
        7: {
            name: "UTF8, file proxy server host/IP",
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        8: {
            name: "LongWord, file proxy server port number",
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.getLongWord()
            }
        },
    }
    console.log('== File transfer info parameters')
    console.log(msg)

    msg.wTLD.forEach(val => {
        params[val.type].set(val.data)
        console.log(params[val.type].name, params[val.type].value)
    })
}

module.exports = ftSrvParamsReply;