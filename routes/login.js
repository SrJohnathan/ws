/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
//var wss = require('seckets');
var router = express.Router();

var xmppser = require('../xmpp/server');






router.get('/', function(req, res, next) {
  res.render('login');
  
  
  
 
  
  //wss.createSocketServe(8080);
  
});

module.exports = router;




