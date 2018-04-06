/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//const Ws = require('ws');
//const Banco = require('./database/Banco');



var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


//var users = require('./routes/users');
var login = require('./routes/login');
var data = require('./routes/data');
var admin = require('./routes/admin');
var event = require('./ajws/action/WSProto');
var xmpp = require('./xmpp/server');
var xmp = require('node-xmpp-server');
var Client = require('node-xmpp-client');
var Stanza = require('node-xmpp-core').Stanza





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

/*app.use(
 '/firebase-messaging-sw.js',
 express.static(path.resolve(__dirname, 'public/javascripts/firebase-messaging-sw.js'))
 ); */
app.use('/', login);
//app.use('/users', users);
app.use('/admin', admin);
app.use('/data', data);
app.use('/login', login);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

module.exports.getserver = function (serve) {

    var WS = new event(serve);

  /*  xmpp.startServer(function () {

        var client1 = new Client({
            jid: 'web@localhost',
            password: '654321'
        })
        client1.on('online', function () {
            console.log('client1: online')
            
            
            client1.send(new xmp.Stanza('message', {to: 'localhost'}).c('body').t('HelloWorld'))
        })
        client1.on('stanza', function (stanza) {
            console.log('client1: stanza', stanza.root().toString())
        })

    }); */

  //  xmpp.start();
    /*  xmpp.startServer(function () {
     var client1 = new Client({
     websocket: {url: 'ws://localhost:5280'},
     jid: 'client1@localhost',
     password: 'secret'
     })
     client1.on('online', function (data) {
     
     
     client1.send(new Stanza('message', {to: 'localhost'}).c('body').t('HelloWorld'))
     })
     client1.on('stanza', function (stanza) {
     console.log('client1', 'received stanza', stanza.root().toString())
     });
     
     }); */

}



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