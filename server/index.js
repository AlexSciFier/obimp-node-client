/*
Byte = UInt8
Word = UInt16BE
LongWord = UInt32BE

*/
const obimp = require('./obimp');
const net = require('net');
const { io } = require('./socket/socket');
const { closeHandler, errorHandler, dataHandler } = require('./handlers/basePacketHandler')

class ClientObimp {
    constructor(_socket) {
        this.host = '';
        this.port = '';
        this.creds = { login: '', password: '' };
        this.clHash = '';
        this.client = new net.Socket();
        this.sequence = 0;
        this.socket = _socket;
    }
}

io.on('connection', (socket) => {
    let cl = new ClientObimp(socket)
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        cl.client.end()
        cl.client.destroy()
    });

    cl.socket.on('login', (value) => {
        cl.host = value.host
        cl.port = value.port
        cl.creds = {
            login: value.login,
            password: value.password
        }
        cl.clHash = value.clHash;

        var bytesToSend = obimp.serialize(cl.sequence++, 1, 1, 0, [{ type: 1, data: Buffer.from(cl.creds.login, 'utf-8') }])
        cl.client.destroy()
        try {
            cl.client.connect(cl.port, cl.host, function () {
                console.log('CONNECTED TO: ' + cl.host + ':' + cl.port);
                console.log('-> SENDING CONNECT')
                cl.client.write(bytesToSend);
            });
        } catch (err) {
            console.error(err)
        }
    })

    cl.socket.on('sendMessage', (message) => {
        console.log('-> SENDING MESSAGE', message)
        let msgID = Buffer.alloc(4)
        msgID.writeUInt32BE(Math.floor(Math.random() * 1000))

        let msgType = Buffer.alloc(4)
        msgType.writeUInt32BE(1)

        console.log('request to send message', message)
        let messageToSend = obimp.serialize(cl.sequence++, 4, 6, 0, [
            {
                type: 1,// wTLD 0x0001: UTF8, account name of message receiver
                data: Buffer.from(message.account)
            },
            {
                type: 2,// wTLD 0x0002: LongWord, unique message ID
                data: msgID
            },
            {
                type: 3,// wTLD 0x0003: LongWord, message type (see below)
                data: msgType
            },
            {
                type: 4,// wTLD 0x0004: BLK, message data
                data: Buffer.from(message.message)
            }
        ])
        cl.client.write(messageToSend)
    })
    cl.socket.on('requestAvatar', message => {
        message.forEach(hash => {
            console.log('-> REQUEST AVATAR', hash)
            let packet = obimp.serialize(cl.sequence, 6, 3, 0, [{ type: 1, data: Buffer.from(hash) }])
            cl.client.write(packet)
        })
    })


    let receved = Buffer.alloc(0)
    cl.client.on('data', function (data) {
        console.log('RCV FROM', cl.socket.id, data.byteLength)
        if (obimp.isMoreNeeded(data)) {
            receved = Buffer.concat([receved, data])
            return
        }
        receved = Buffer.concat([receved, data])
        dataHandler(receved, cl)
        receved = receved.slice(receved.byteLength)
    });

    cl.client.on('error', (err) => {
        errorHandler(err, cl)
    })

    // Add a 'close' event handler for the client socket
    cl.client.on('close', () => {
        closeHandler()
    });
});

module.exports = { io }