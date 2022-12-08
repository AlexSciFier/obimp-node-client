const TYPES = require('../../types')
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
function contactOnline(msg, clientObimp) {

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
        2: {
            name: "Presence status",    // 02: LongWord, presence status value
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
            name: "Status name",    // 03: UTF8, status name
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        4: {
            name: "Additional status picture number",    // 04: LongWord, additional status picture number
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
            name: "Additional status picture description",    // 05: UTF8, additional status picture description
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
            name: "Client capabilities",    // 06: Array of Word, client capabilities
            value: null,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val
            }
        },
        7: {
            name: "Client type",    // 07: Word, client type
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.getWord()
            }
        },
        8: {
            name: "Client name",    // 08: UTF8, client name
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        9: {
            name: "Client version",    // 09: QuadWord, client version
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.getQuadWord().toString('16')
            }
        },
        10: {
            name: "Client connected time",    // 0A: DateTime, client connected time
            value: null,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.getDateTime()
            }
        },
        11: {
            name: "Registration date",    // 0B: DateTime, registration date
            value: null,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.getDateTime()
            }
        },
        12: {
            name: "OctaWord, avatar MD5 hash",    // 0C: OctaWord, avatar MD5 hash
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('hex')
            }
        },
        13: {
            name: "Client IP address",    // 0D: UTF8, client IP address
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        14: {
            name: "UUID, additional status picture ID",    // 0E: UUID, additional status picture ID
            value: null,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('hex')
            }
        },
        15: {
            name: "User client operating system name",    // 0F: UTF8, user client operating system name
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        16: {
            name: "Additional user client description",    // 10: UTF8, additional user client description
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        17: {
            name: "Custom transport status picture ID",    // 11: Byte, custom transport status picture ID
            value: 0,
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.readInt8()
            }
        },
        18: {
            name: "BLK, array of client identification sTLDs defined by transport",    // 12: BLK, array of client identification sTLDs defined by transport
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('hex')
            }
        },
        19: {
            name: "User client host name",    // 13: UTF8, user client host name
            value: '',
            /**
             * 
             * @param {Buffer} val 
             */
            set(val) {
                this.value = val.toString('utf-8')
            }
        },
        4097: {
            name: "Transport Item ID",    // 01: LongWord, transport Item ID
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
    console.log('== Contact ONLINE');
    msg.wTLD.forEach(val => {
        let message = params[val.type];
        try {
            message.set(val.data)
        } catch (err) {
            console.error(err)
        }
    })
    console.log(params[1].value)

    clientObimp.socket.emit('contactOnline', {
        name: params[1].value,
        status: TYPES.PRES_STATUS[params[2].value],
        statusName: params[3].value,
        avatarHash: params[12].value
    })
}
module.exports = contactOnline