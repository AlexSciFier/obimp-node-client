const obimp = require('../../obimp')
const crypto = require('crypto');

var params = {
    1: {
        name: "BLK, contact list data",
        value: undefined,
        set(val) {
            this.value = clHandler(val)
        }
    },
}

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
function clSrvReply(msg, clientObimp) {
    console.log('== Server side contact list data')
    let wTLD = msg.wTLD[0]
    let param = params[wTLD.type]
    param.set(wTLD.data)
    let clListHash = crypto.createHash('md5').update(msg.wTLD[0].data).digest('hex');

    sendClListToClient(param.value, clListHash, clientObimp);
    sendPresInfo(msg, clientObimp)
}

/**
 * 
 * @param {Buffer} data 
 * @returns 
 */
function clHandler(data) {
    let clItemsCount = data.readUInt32BE()
    let clItemsArray = data.slice(4)

    let itemArray = []

    for (let index = 0; index < clItemsCount; index++) {
        var clItemSTLDType = {
            1: {
                name: "GroupName",
                handler(val) {
                    return val.toString('utf-8')
                }
            },
            2: {
                name: "AccountName",
                handler(val) {
                    return val.toString('utf-8')
                }
            },
            3: {
                name: "ContactName",
                handler(val) {
                    return val.toString('utf-8')
                }
            },
            4: {
                name: "PrivacyType",
                handler(val) {
                    return val.readUInt8()
                }
            },
            5: {
                name: "AuthorizationFlag",
                handler(val) {
                    return undefined
                }
            },
            6: {
                name: "GeneralItemFlag",
                handler(val) {
                    return undefined
                }
            },
            4097: {
                name: "TransportItemID",
                handler(val) {
                    return val.readUInt32BE()
                }
            },
            4098: {
                name: "TransportUUID",
                handler(val) {
                    return val.toString('hex')
                }
            },
            4099: {
                name: "UTF8, transport account name",
                handler(val) {
                    return val.getUtf8()
                }
            },
            4100: {
                name: "UTF8, transport friendly name",
                handler(val) {
                    return val.getUtf8()
                }
            },
            8193: {
                name: "NoteName",
                handler(val) {
                    return val.getUtf8()
                }
            },
            8194: {
                name: "NoteType",
                handler(val) {
                    return val.getByte()
                }
            },
            8196: {
                name: "NoteText",
                handler(val) {
                    return val.getUtf8()
                }
            },
            8197: {
                name: "NoteDateUTC",
                handler(val) {
                    return val.getDateTime()
                }
            },
            8198: {
                name: "NotePictureMD5",
                handler(val) {
                    return val.toString('hex')
                }
            },

        }
        var clItemType = {
            1: { name: "GROUP" },
            2: { name: "CONTACT" },
            3: { name: "TRANSPORT" },
            4: { name: "NOTE" },
        }
        let item = {}
        item.type = clItemType[clItemsArray.getWord()].name
        item.itemID = clItemsArray.getLongWord(2)
        item.groupID = clItemsArray.getLongWord(6)
        item.length = clItemsArray.getLongWord(10)
        item.sTLDItems = {}
        let sTLDData = clItemsArray.slice(14, 14 + item.length);

        while (sTLDData.byteLength > 0) {

            let sTLD = obimp.parseSTLD(sTLDData)
            sTLDData = sTLDData.slice(sTLD.length + 4)
            sTLD.value = clItemSTLDType[sTLD.type].handler(sTLD.data)
            let type = clItemSTLDType[sTLD.type].name
            delete sTLD.data
            item.sTLDItems[type] = sTLD.value
        }
        itemArray.push(item)

        clItemsArray = clItemsArray.slice(14 + item.length)
    }

    return itemArray
}

Array.prototype.groupBy = function (key) {
    return this.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.key === v);
        if (el) {
            el.values.push(x);
        } else {
            rv.push({ key: v, values: [x] });
        } return rv;
    }, []);
}


function list_to_tree(list) {
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
        map[list[i].itemID] = i; // initialize the map
        list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.groupID !== 0) {
            // if you have dangling branches check that map[node.parentId] exists
            let t = list[map[node.groupID]]
            if (t) {
                t.children.push(node);
            }
        } else {
            roots.push(node);
        }
    }
    return roots;
}

function sendClListToClient(list, hash, clientObimp) {
    let hierarchyLists = list_to_tree(list)

    console.log('clList', {
        hash,
        list: hierarchyLists
    });
    clientObimp.socket.emit('clList', {
        hash,
        list: hierarchyLists
    })
}

function sendPresInfo(msg,clientObimp) {
    let sequence = clientObimp.sequence + 1;
    console.log('-> SENDING PRES INFO')
    let bex = {
        seq: sequence,
        type: 3,
        subtype: 3,
        req: 0,
        wTLD: [
            {
                type: 1,
                data: Buffer.from('000100050006000700080009000A', 'hex')
            },
            {
                type: 2,
                data: Buffer.from([0x00, 0x01], 0, 2)
            },
            {
                type: 3,
                data: Buffer.from('NodeClient')
            },
            {
                type: 4,
                data: Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01], 0, 8)
            },
            {
                type: 5,
                data: Buffer.from([0x00, 0x52], 0, 2)
            }
        ]
    }
    console.log(bex.wTLD)
    let packet = obimp.serialize(clientObimp.sequence++, bex.type, bex.subtype, bex.req, bex.wTLD);
    clientObimp.client.write(packet);

    sequence++;
    let statusBex = {
        seq: sequence,
        type: 3,
        subtype: 4,
        req: 0,
        wTLD: [
            {
                type: 1,
                data: Buffer.from([0x00, 0x00, 0x00, 0x00], 0, 4)
            },
            {
                type: 2,
                data: Buffer.from('В сети')
            },
        ]
    }
    console.log(statusBex.wTLD)
    packet = obimp.serialize(clientObimp.sequence++, statusBex.type, statusBex.subtype, statusBex.req, statusBex.wTLD);
    clientObimp.client.write(packet);

    sequence++;
    let activateBex = {
        seq: sequence,
        type: 3,
        subtype: 5,
        req: 0,
        wTLD: []
    }
    console.log(activateBex.wTLD)
    packet = obimp.serialize(clientObimp.sequence++, activateBex.type, activateBex.subtype, activateBex.req, activateBex.wTLD);
    clientObimp.client.write(packet);

    sequence++;
    let detailsBex = {
        seq: sequence,
        type: 5,
        subtype: 3,
        req: 0,
        wTLD: [
            {
                type: 1,
                data: Buffer.from('192.168.0.3')
            }
        ]
    }
    console.log(detailsBex.wTLD)
    packet = obimp.serialize(clientObimp.sequence++, detailsBex.type, detailsBex.subtype, detailsBex.req, detailsBex.wTLD);
    clientObimp.client.write(packet);

}
module.exports = clSrvReply