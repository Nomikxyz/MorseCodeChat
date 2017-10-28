var socket = io.connect('http://localhost:5000');

var long = document.getElementById('long');
short = document.getElementById('short');

long.addEventListener('click', function() {
    socket.emit('long', socket.id);
    socket.broadcast.emit('audio file', {
        audio: true,
        audioBuffer: buf
    });
});

short.addEventListener('click', function() {
    socket.emit('short', socket.id);
    socket.broadcast.emit('audio file', {
        audio: true,
        audioBuffer: buf2
    });
});

socket.on('long', function(data) {
    socket.broadcast.emit('audio file', {
        audio: true,
        audioBuffer: longbuf
    });
    console.log("Transmitting", socket.id);
});
socket.on('short', function(data) {
    socket.broadcast.emit('audio file', {
        audio: true,
        audioBuffer: shortbuf
    });
    console.log("Transmitting", socket.id);
});
