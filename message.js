/**
 * Created by 姜昊 on 2016/4/12.
 */
var PORT = "2828";
var http = require('http');
var qs = require('qs');
var TOKEN = 'lemon';

var wss = require('./websocket.js').wss;
var getUserInfo = require('./user.js').getUserInfo;

function checkSignatur(params,token){
    var key =[token,params.timestamp,params.nonce].sort().join('');
    var sha1 = require('crypto').createHash('sha1');
    sha1.update(key);
    return sha1.digest('hex') == params.signature;
}

var server = http.createServer(function(req,res){
   var query = require('url').parse(req.url).query;
    var params = qs.parse(query);

    if(!checkSignatur(params,TOKEN)){
        res.end('signature fail');
        return;
    }
    if(req.method == "GET"){
        res.end(params.echostr);
    }else{
        var postdata = "";
        req.addListener("data",function(postchunk){
            postdata +=postchunk;
        });
        req.addListener("end", function () {
            var parseString = require('xml2js').parseString;
            parseString(postdata,function(err,result){
                if(!err){
                    if(result.xml.MsgType[0]==='text'){
                        getUserInfo(result.xml.FromUserName[0])
                            .then(function(userInfo){
                                result.user = userInfo;
                                wss.broadcast(result);
                                var resMsg =replyText(result,'copy that');
                                res.end(resMsg);
                            });
                    }
                }
            });
        });
    }
});
server.listen(PORT);
console.log("app is running at port 2828");

function replyText(msg,replyText){
    if(msg.xml.MsgType[0] !== 'text'){
        return '';
    }
    console.log(msg);
    var tmpl =require('tmpl');
    var replyTmpl = '<xml>' +
        '<ToUserName><![CDATA[{toUser}]]></ToUserName>' +
        '<FromUserName><![CDATA[{fromUser}]]></FromUserName>' +
        '<CreateTime><![CDATA[{time}]]></CreateTime>' +
        '<MsgType><![CDATA[{type}]]></MsgType>' +
        '<Content><![CDATA[{content}]]></Content>' +
        '</xml>';
    return tmpl(replyTmpl,{
        toUser: msg.xml.FromUserName[0],
        fromUser: msg.xml.ToUserName[0],
        type: 'text',
        time: Date.now(),
        content: replyText
    });

}