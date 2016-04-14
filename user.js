/**
 * Created by 姜昊 on 2016/4/14.
 */
var appID = require('./config.js').appID;
var appSecret = require('./config.js').appSecret;

var getToken = require('./token.js').getToken;

var request = require('request');

function getUserInfo(openID){
    return getToken(appID,appSecret).then(function(res){
        var token = res.access_token;
        return new Promise(function(resolve,reject){
            request('https://api.weixin.qq.com/cgi-bin/user/info?access_token='+token+'&openid='+openID+'&lang=zh_CN',
            function(err,res,data){
                resolve(JSON.parse(data))
            });
        });
    }).catch(function(err){
        console.log(err);
    });
}
module.exports = {
    getUserInfo : getUserInfo
}