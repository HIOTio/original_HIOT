var mosca  =require('mosca');

var server = new mosca.Server({port:1884});

server.on('clientConnected',function(client){
});

server.on('published',function(packet,client){
});

server.on('ready',setup);

function setup(){
}