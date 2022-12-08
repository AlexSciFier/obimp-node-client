const crypto = require('crypto');
const utf8 = require('utf8');
const obimp = require('../../obimp');
const TYPES = require('../../types')

async function srvHello(msg, clientObimp) {
    let { login, password } = clientObimp.creds;
    let client = clientObimp.client
    console.log('<- SRV_HELLO');
    if (msg.wTLD[0].type == 1) {
        let errorCode = TYPES.HELLO_ERROR_CODE[msg.wTLD[0].data.readInt16BE(0)];
        console.error(errorCode)
        clientObimp.socket.emit('srvLoginReply', {
            error: true,
            errorCode: errorCode
        })
        return;
    }
    // Принимаем MD5 Ключ
    console.log('MD5 Key', msg.wTLD[0].data.toString('utf-8'))

    let MD5KeyBuffer = msg.wTLD[0].data;

    // генирируем хеш
    let hashed = getHashedPassword(login, password, MD5KeyBuffer);

    console.log('Hashed password', hashed)

    let hashedBuffer = Buffer.from(hashed, 'hex');

    let res = obimp.serialize(clientObimp.sequence++, 1, 3, 0, [
        { type: 1, data: Buffer.from(login, 'utf-8') },
        { type: 2, data: hashedBuffer.slice(0, 16) }
    ]);
    console.log('-> SENDING CRED INFO')
    client.write(res);
}

/**
 * Хешировать логин, пароль
 * MD5(MD5(UTF8Encode(LowerCase(Account)) + "OBIMPSALT" + UTF8Encode(Password)) + ServerKey)
 * @param {String} login 
 * @param {String} password 
 * @param {Buffer} MD5KeyBuffer 
 * @returns {String}
 */
function getHashedPassword(login, password, MD5KeyBuffer) {
    //MD5(MD5(UTF8Encode(LowerCase(Account)) + "OBIMPSALT" + UTF8Encode(Password)) + ServerKey)

    //1. Кодируем логин, пароль, OBIMPSALT в Utf-8 и склеиваем
    let encodedLogin = utf8.encode(login.toLocaleLowerCase());
    let encodedPassword = utf8.encode(password);
    let credPair = encodedLogin + utf8.encode('OBIMPSALT') + encodedPassword;

    //2. Переводим получившуюся строку в byteArray и берём MD5 хеш
    let hashedcredPair = crypto.createHash('md5').update(Buffer.from(credPair, 'utf-8')).digest('hex');

    //3. Объединяем получившийся byteArray и добавляем MD5key от сервера
    let hashedcredPairBytes = Buffer.from(hashedcredPair, 'hex');
    let finalBytes = Buffer.allocUnsafe(hashedcredPairBytes.byteLength + MD5KeyBuffer.byteLength)
    finalBytes.set(hashedcredPairBytes)
    finalBytes.set(MD5KeyBuffer, hashedcredPairBytes.byteLength)

    //4. Берём md5 хеш от получившегося значения
    // let finalSring = Buffer.from(hashedcredPair + MD5KeyBuffer.toString('utf-8'));
    return crypto.createHash('md5').update(finalBytes).digest('hex')
}

module.exports = srvHello