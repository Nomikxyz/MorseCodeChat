var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html'); //Fetch the static HTML page
});

io.on('connection', function(socket) { //upon connection, begin listening for client-side emit messages
    socket.on('shortClick', function(data) { //when client-side emit message comes in
        console.log("Short press from " + socket.id); //print who is transmitting what into the console
        fs.readFile(__dirname + '/public/sounds/trollism2.wav', function(err, shortbuf) { //read the short tone file
            io.emit('audio file', { //send file to client
                audio: true,
                audioBuffer: shortbuf
            });
        });
    });
    socket.on('longClick', function(data) { //same thing as shortClick but with the other file in public/sounds
        console.log("Long press from " + socket.id);
        fs.readFile(__dirname + '/public/sounds/trollism.wav', function(err, longbuf) {
            io.emit('audio file', {
                audio: true,
                audioBuffer: longbuf
            });
        });
    });
});

server.listen(3000, function() {
    console.log('Listening on port 3000'); //Listen for connections on port 3000
});
