/**
 * Created by 姜昊 on 2016/4/14.
 */
function startWall(){
    var express     = require("express"),
        path        = require('path'),
        bodyParser  = require('body-parser');
    var app = express();

    app.set('views',path.join(__dirname,'views'));
    app.set('view engine','ejs');

    app.use(express.static(path.join(__dirname,'public')));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended:true }));
    app.get('/',function(req,res){
        res.render('wall');
    });
    app.listen(3000,function(request , response){
        console.log("wallServer is running at port 3000");
    });
}
module.exports={
    startWall:startWall
}


