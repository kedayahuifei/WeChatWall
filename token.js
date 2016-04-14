/**
 * Created by 姜昊 on 2016/4/14.
 */
var request = require('request');
var fs = require('fs');

function getToken(appID,appSecret){
    return new Promise(function(resolve,reject){
        var token;
        if(fs.exitsSync('token.dat')){
            token = JSON.parse(fs.readFileSync('token.dat'));
        }

        if(!token|| token.timeout<Date.now()){
            request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appID+'&secret='+appSecret,
            function(err,res,data){
                var result = JSON.parse(data);
                result.timeout = Date.now() + 7000000;
                fs.writeFileSync('token.dat',JSON.stringify(result));
                resolve(token);
            });
        }else{
            resolve(token);
        }
    });
}
module.exports ={
    getToken :getToken
}