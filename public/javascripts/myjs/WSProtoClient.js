/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';




class WSProtoClient {

    constructor(stringpath) {


        this.wss = new WebSocket(stringpath);



    }

    getToken(username, call) {

        var ajax = new XMLHttpRequest();

        ajax.open("POST", "http://localhost/ac", true);
        ajax.send(JSON.stringify({method: 'token', user: username}));

        ajax.onreadystatechange = function () {

            if (ajax.readyState === 4) {


                call(ajax.responseText);


            }
        };



    }
    init(key, uuid, plataform) {
        this.wss.onopen = function (ev) {
            var res = {id: uuid, name: 'AD', plataform: plataform, method: "open", key: key};
            this.wss.send(JSON.stringify(res));
        };
    }

    message(text) {
        this.wss.onmessage = function (message) {
            
            
            

        };

    }

}


var uuid = 'g8r6d' + Math.random();




wss.onopen = function (ev) {



    var res = {id: uuid, name: 'AD', plataform: 'Web', method: "open", key: "5895689569855698"};

    wss.send(JSON.stringify(res));

};

