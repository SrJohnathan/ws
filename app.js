/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//const Ws = require('ws');
//const Banco = require('./database/Banco');



var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//var index = require('./routes/admin');
//var users = require('./routes/users');
var index = require('./routes/index');
//var data = require('./routes/data');







var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    '/firebase-messaging-sw.js',
    express.static(path.resolve(__dirname, 'public/javascripts/firebase-messaging-sw.js'))
);
app.use('/', index);
//app.use('/users', users);
//app.use('/admin', index);
//app.use('/data',data);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;




/*
var wss = new Ws.Server({port: 5050});

var database = new Banco("localhost", "root", "", "ws");



wss.on("connection", function connection(so, req) {


    so.on('message', function message(message) {
        
       
        
    });


    so.on('error', function err(err) {
        console.log(err);
    });

    so.on('listening', function listening() {

    });
});


function  send(wss,so,message){
    
   
    wss.clients.forEach(function each(client) {
            if (client !== so && client.readyState === Ws.OPEN) {
                msg = JSON.parse(message);
                client.send(JSON.stringify({datas:msg}));
            }
        });
    
    
}


function  seve(){
    
    
    
} */