var express = require("express");
//const multipart = require("connect-multiparty");
var router = express.Router();
var axios=require('axios');
//var teststreamFB=require("../models/asyncfunction");
//var helper=require("../helpers/helper");
const schedule = require("node-schedule");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit ({
    windowMs: 30*60*1000,
    max: 5,
    message: "Máy móc cũng mòn, nhưng...kính mời!!! :))"
}); //giới hạn IP truy cập không quá 5 lần / 30p
process.env.TZ= "Asia/Bangkok";
//router.use("/admin", require(__dirname+"/admin"));
//router.use("/blog", require(__dirname+"/blog"));

//hàm đặt lại lịch quét
const jobRunlogfaceblocks = schedule.scheduleJob('*/7 * * * *', async function(){
    await RunFaceblocks('https://faceblocks.onrender.com/blog');
    await RunFaceblocks('https://face-ids.onrender.com/blog');
    // await getNotification();
});
// const jobRunNotifi = schedule.scheduleJob('*/45 * * * *', async function(){
//     await getNotification();
// });
async function RunFaceblocks(link) {
    try{
        if (link==undefined || link == "") return false;
        let connectAxios = await axios.get(link, {timeout: 3*60*1000});
        //connectAxios.status<400 add url to DB
        //console.log ('Faceblocks => status: '+connectAxios.status);
        if (connectAxios.status<400) {
            return true;
        } else {
            return false;
        };
    } catch (err){
        console.log(err);
        return false;
    };
};
//hàm đặt lại lịch quét

router.get("*", limiter, function(req, res){
    return res.redirect("https://www.google.com/");
});
module.exports=router;