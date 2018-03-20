/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

const banco = require('../database/Banco');
const WS = require('ws');





var webs;

class WSProto {

    constructor(port) {

        webs = new WS.Server({port: port});
        
        


    }
    
    
    run(socket,user){
        
        
        
    }

}

module.exports = WSProto;

