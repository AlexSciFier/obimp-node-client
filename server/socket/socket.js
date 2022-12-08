const server = require('http').createServer();
const socketIO = require('socket.io')
const io = new socketIO.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


server.listen(3333, () => {
    console.log('listening on *:3333');
});

module.exports = { io }