/**
 * Created by 姜昊 on 2016/4/12.
 */
/**
 * Created by 姜昊 on 2016/4/12.
 */
var PORT = "2828";
var http = require('http');
var qs = require('qs');
var TOKEN = 'lemon';

function checkSignatur(params,token){
    var key =[token,params.timestamp,params.nonce].sort().join('');
    var sha1 = require('crypto').createHash('sha1');
    sha1.update(key);
    return sha1.digest('hex') == params.signature;
}

var server = http.createServer(function(req,res){
    var query = require('url').parse(req.url).query;
    var params = qs.parse(query);

    if(checkSignatur(params,TOKEN)){
        res.end(params.echostr);
    }else{
        res.end('signature fail');
    }
});
server.listen(PORT);
console.log("app is running at port 2828");