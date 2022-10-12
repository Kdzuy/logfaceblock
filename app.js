var express = require("express");
var config = require("config");
var cookieParser = require("cookie-parser");
//var logger = require('morgan');
var session = require("express-session");
//var socketio=require("socket.io");
var app = express();
//body-parser
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
// app.use(logger('dev'));
app.use(cookieParser());
app.use(
  session({
    secret: config.get("secret_key"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//static folder
app.use("/static", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/static2"));
//app.use(morgan("dev"));
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");
app.set("trust proxy", 1); //trust first proxy
//app.use(logger('combined'));
var controllers = require(__dirname + "/apps/controllers");
app.use(controllers);
//var host=config.get("server.host");
var port = process.env.PORT || config.get("server.port");
//var server=app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
var server = app.listen(port, function () {
  console.log("Server is running on port ", port);
});
//var io=socketio(server);
