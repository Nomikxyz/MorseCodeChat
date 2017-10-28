var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 
var fs = require('fs');

app.use(express.static(__dirname + '/public')); 

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {  
    socket.on('shortClick', function(data) {
	console.log("Short press from " + socket.id);
    	  fs.readFile(__dirname + '/public/sounds/trollism2.wav', function(err, shortbuf) {
            io.emit('audio file', {
                audio: true,
                audioBuffer: shortbuf
            });
    });
});
    socket.on('longClick', function(data) {
		  console.log("Long press from " + socket.id);
    	  fs.readFile(__dirname + '/public/sounds/trollism.wav', function(err, longbuf) {
            io.emit('audio file', {
                audio: true,
                audioBuffer: longbuf
            });
    });
});
});

server.listen(3000, function(){
  console.log('Listening on port 3000');
}); 

