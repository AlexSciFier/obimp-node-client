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
function presParamsReply(msg, clientObimp) {
    const params = {
        1: { name: 'maximal UTF-8 encoded status name length' },
        2: { name: 'maximal UTF-8 encoded additional status picture length' },
        3: { name: 'maximal UTF-8 encoded client name length' },
        4: { name: 'maximal capabilities count' },
        5: { name: 'required optional client information flags (see below)' },
    }
    console.log('== Presence info parameters')
    console.log(msg)
    msg.wTLD.forEach(val => {
        console.log(params[val.type].name, val.data.readInt32BE())
    })
}

module.exports = presParamsReply;