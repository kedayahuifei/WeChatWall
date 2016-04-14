/**
 * Created by 姜昊 on 2016/4/14.
 */
var WS_PORT = 10001;

var websocketServer = require('ws').Server,
    wss = new websocketServer({port:WS_PORT});

wss.on('connection', function connection(ws) {
    ws.on('message',function incoming(message){
        console.log('received:%s',message);
    });
    console.log('new client connected.');
});

wss.broadcast = function broadcast(data){
    wss.clients.forEach(function each(client){
        client.sen(JSON.stringify(data));
    });
};

module.exports =
{
    wss:wss
};
console.log("Socket server runing at port: " + WS_PORT + ".");