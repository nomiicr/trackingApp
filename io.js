var io = require('socket.io')();

io.on('connection', function (socket) {
    socket.emit('hello', "data")

    socket.on('track-user', (data) => {
        // io.emit('contact-online',data)
        console.log(data)
        socket.emit('hello', data)
    })
    socket.on('set-offline', data => {
        io.emit('contact-offline', data)
    })
    socket.on('disconnect', (data) => {
        console.log('got dc', data)
    })
});

module.exports = io;