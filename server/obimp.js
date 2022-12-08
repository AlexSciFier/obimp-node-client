const TYPES = require('./types');

/**
 * 
 * @param {Buffer} data 
 */
function parseSTLD(packet) {
    let type = packet.getWord()
    let length = packet.getWord(2)
    let data = packet.slice(4, 4 + length)

    return {
        type,
        length,
        data
    }
}

/**
 * 
 * @param {Buffer} data 
 * @param {int} offset 
 */
function parsewTLD(data, offset = 0) {
    let bex = {}
    bex.type = data.readUInt32BE(offset)
    if (data.byteLength < offset + 4) {
        bex.length = 0
        return bex
    }
    bex.length = data.readUInt32BE(offset + 4)
    if (bex.length) {
        bex.data = data.slice(offset + 8, offset + 8 + bex.length)
    }
    return bex
}

/**
 * @param {Buffer} dv
 * @param {int} [offset]
 * @return {{
 * sequence: number;
 * type: number;
 *  subtype: number;
 *  request: number;
 *  size: number;
 *  data: string;
 *  wTLD: [{
 *      type: number;
 *      length: number;
 *      data: Buffer;
 * }];
 * }|null}
 */
function getBexHeader(dv, offset = 0) {

    if (dv.byteLength < offset + 17) return null

    if (dv.readUInt8(offset) === 0x23) {
        let bex = {}
        bex.sequence = dv.readUInt32BE(offset + 1, false)
        bex.type = dv.readUInt16BE(offset + 5, false)
        bex.subtype = dv.readUInt16BE(offset + 7, false)
        bex.request = dv.readUInt32BE(offset + 9, false)
        bex.size = dv.readUInt32BE(offset + 13, false)
        if (bex.size) {
            bex.data = dv.slice(offset + 17);

            let wTLDarray = [];

            let wTLDOffset = 0;
            let wTLD;

            while (wTLDOffset < bex.size) {
                try {
                    wTLD = parsewTLD(dv.slice(offset + 17), wTLDOffset);
                    wTLDOffset += wTLD.length + 8;
                    wTLDarray.push(wTLD);
                } catch (error) {
                    wTLDOffset += wTLD.length + 8;
                    console.error(error.message)
                }
            }
            bex.wTLD = wTLDarray;

        }
        return bex
    }
    return null
}

/**
 * 
 * @param {Buffer} packet 
 * @returns 
 */
function parse(packet) {
    var parsed = [];
    let buffer = packet;
    let bex, offset = 0
    while (null !== (bex = getBexHeader(buffer, offset))) {
        offset += bex.size + 17
        parsed.push(bex)
    }
    return parsed;
}

/**
 * 
 * @param {Buffer} packet 
 * @returns 
 */
function isMoreNeeded(packet) {
    const headerSize = 17
    let headerIndex = 0
    let packetClone = Buffer.alloc(packet.byteLength);
    packet.copy(packetClone)
    while (headerIndex !== -1) {
        headerIndex = packetClone.indexOf(0x23)
        if (packetClone.byteLength < headerSize)
            return true
        let size = packetClone.readUInt32BE(13)
        if (size + headerSize == packetClone.byteLength)
            return false
        if (size + headerSize > packetClone.byteLength)
            return true
        packetClone = packetClone.slice(size + headerSize)
    }
}
/**
 * 
 * @param {Number} seq 
 * @param {Number} type 
 * @param {Number} subtype 
 * @param {Number} req 
 * @param {[{
 * type:Number,
 * data:Buffer
 * }]} wTLDarray 
 * @returns {Buffer}
 */
function serialize(seq, type, subtype, req, wTLDarray) {

    let wTLDArrayLength = 0;

    wTLDarray.forEach((value) => {
        wTLDArrayLength += wTLDToBuffer(value.type, value.data).byteLength;
    })

    let wTldBuffer = Buffer.alloc(wTLDArrayLength);

    let offset = 0;
    wTLDarray.forEach((value) => {
        let buffer = wTLDToBuffer(value.type, value.data)
        wTldBuffer.set(buffer, offset);
        offset += buffer.byteLength;
    })

    let payloadSize = wTldBuffer.byteLength;
    var buffer = Buffer.alloc(payloadSize + 17)
    buffer.writeUInt8(0x23)
    buffer.writeUInt32BE(seq, 1) //seq
    buffer.writeUInt16BE(type, 5) //type
    buffer.writeUInt16BE(subtype, 7) //subtype
    buffer.writeUInt32BE(req, 9) //req
    buffer.writeUInt32BE(payloadSize, 13) //wTLD length
    buffer.set(wTldBuffer, 17);
    return buffer;
}

/**
 * 
 * @param {Number} type 
 * @param {Buffer} data 
 * @returns {Buffer}
 */
function wTLDToBuffer(type, data) {
    let buffer = Buffer.allocUnsafe(data.length + 8)
    buffer.writeUInt32BE(type)
    buffer.writeUInt32BE(data.length, 4)
    buffer.set(data, 8)
    return buffer
}

Buffer.prototype.getByte = function (offset = 0) {
    return this.readInt8(offset)
}

Buffer.prototype.getWord = function (offset = 0) {
    return this.readUint16BE(offset)
}

Buffer.prototype.getLongWord = function (offset = 0) {
    return this.readUint32BE(offset)
}

Buffer.prototype.getQuadWord = function (offset = 0) {
    return this.readBigInt64BE(offset)
}

Buffer.prototype.getDateTime = function () {
    return new Date(this.readBigInt64BE().toString(10) * 1000)
}

Buffer.prototype.getUtf8 = function () {
    return this.toString('utf-8')
}
module.exports = {
    parse,
    serialize,
    parseSTLD,
    isMoreNeeded
}