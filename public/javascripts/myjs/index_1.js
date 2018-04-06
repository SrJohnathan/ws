/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





var uuid = 'g8r6d'+ Math.random();


var wss = new WebSocket("ws://localhost:5000");

wss.onopen = function (ev) {
    
    
    
    var res = {id:uuid,name:'AD',plataform:'Web',method:"open",key:"5895689569855698"};

   wss.send(JSON.stringify(res));

};

 wss.onmessage = function (message){
   
     console.log(message);
     
 };