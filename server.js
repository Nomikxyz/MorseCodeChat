var express = require('express');
var socket = require('socket.io');
var fs = require('fs');
var app = express();
var server = app.listen(5000, function() {
    console.log("Listening to requests on port 5000")
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket) {
    console.log('New transmitter', socket.id);
    fs.readFile(__dirname + '/public/sounds/trollism.wav', function(err, longbuf) {

        socket.on('long', function(data) {
            socket.broadcast.emit('long', data);
            console.log("Long press from " + socket.id);
            socket.broadcast.emit('audio file', {
                audio: true,
                audioBuffer: longbuf
            });

        });
    });
    fs.readFile(__dirname + '/public/sounds/trollism2.wav', function(err, shortbuf) {

        socket.on('short', function(data) {
            socket.broadcast.emit('long', data);
            console.log("Short press from " + socket.id);
            socket.broadcast.emit('audio file', {
                audio: true,
                audioBuffer: shortbuf
            });

        });
    });
});
