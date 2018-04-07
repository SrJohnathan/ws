/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function (){
    
    
$('#containere').load("/html/websocket.html");
$('#webso').load("/html/websok.html");


var uuid = "locahostAd";


var wss = new WebSocket("wss://barbaridade.herokuapp.com");

wss.onopen = function (ev) {
    
    
    
    var res = {id:uuid,name:'AD',plataform:'Web',method:"open",key:"5895689569855698"};

   wss.send(JSON.stringify(res));

};

 wss.onmessage = function (ev){
   
   //{"to":"locahostAd","id":"system","method":"ADD","idadd":"2a38d515-ea2d-4e55-9eeb-bbf3f7d40757","precesse":2}
     var js = JSON.parse(ev.data);
     console.log(ev.data);
     
     if(js.method === "open"){
         
         $("#countws").html(js.precesse);
     }
     
     if(js.method === "ADD"){
         
         $("#countws").html(js.precesse);
     }
     
 };
    
    
    
});



