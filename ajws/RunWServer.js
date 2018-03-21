/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';


const WS = require('ws');

var webs;


 module.exports.init = function (port) {

        webs = new WS.Server({8080});

        console.log("start");

    };

  module.exports.onconnection = function() {
	  
	  console.log("oncennection");
      
        webs.on('connection', function (so, req) {

            const ip = req.connection.remoteAddress;
            
            

            so.on('message', function (message) {

              send(so,message);
              

            });


            so.on('error', function (err) {

            });

            so.on('listening', function () {

            });



        });
    };

  module.exports.send = function( so, message) {


        webs.clients.forEach(function each(client) {
            if (client !== so && client.readyState === WS.OPEN) {
              var  msg = JSON.parse(message);
                client.send(JSON.stringify({datas: msg}));
            }
        });


    }
    
    
    function send(so,message){
        
        console.log(JSON.parse(message));
        
        webs.clients.forEach(function each(client) {
            if (client !== so && client.readyState === WS.OPEN) {
               var msg = JSON.parse(message);
                client.send(JSON.stringify({datas: msg}));
            }
        });
    }
    

 module.exports.getclient = function () {
        this.webs.clients.forEach(function echo(client) {
            console.log(client);
        });
    };

    







