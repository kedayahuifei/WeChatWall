/**
 * Created by 姜昊 on 2016/4/15.
 */
var tmpl =require('tmpl');
var http = require('http');
var fs = require('fs');
if(typeof msgType == "undefined"){
    var msgType = {
        text: 'text',
        image:'image',
        video: 'video',
        shortvideo: 'shortvideo',
        location :'location',
        link : 'link'
    }
}
function reply(msg){
    console.log(msg);
    var replyText ='';
    switch(msg.xml.MsgType[0]){
        case msgType.text:
            replyText = '收到文本类型消息，已在微信墙上显示';
            break;
        case msgType.video:
            replyText = '收到视频类型消息，不能在微信墙上显示';
            break;
        case msgType.image:
            replyText = '收到图片类型消息，已在微信墙上显示';
            break;
        case msgType.shortvideo:
            replyText = '收到小视频类型消息，不能在微信墙上显示';
            break;
        case msgType.link:
            replyText = '收到链接类型消息，不能在微信墙上显示';
            break;
        case msgType.location:
            replyText = '收到位置类型消息，不能在微信墙上显示';
            break;
        default:
            replyText ='搞不懂你发的是什么';
            break;
    }
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
module.exports ={
    reply:reply
};