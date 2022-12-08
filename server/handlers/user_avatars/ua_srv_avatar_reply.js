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
function uaSrvAvatarReply(msg, clientObimp) {
    console.log('== USER AVATAR REPLY')
    console.log(msg)
    // const params = {

    // }
    // console.log('== Presence info parameters')
    // console.log(msg)
    // msg.wTLD.forEach(val => {
    //     console.log(params[val.type].name, val.data.readInt32BE())
    // })
}

module.exports = uaSrvAvatarReply;