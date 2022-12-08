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
function uaSrvParamsReply(msg, clientObimp) {
    console.log('== USER AVATARS')

    // const params = {

    // }
    // console.log('== Presence info parameters')
    // console.log(msg)
    // msg.wTLD.forEach(val => {
    //     console.log(params[val.type].name, val.data.readInt32BE())
    // })
}

module.exports = uaSrvParamsReply;