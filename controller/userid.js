/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

var ipp;
var useridp;

class UserId {
    
    

    construtor() {

    }

    setIp(ip) {
        ipp = ip;
    }

    setUser(user) {
        useridp = user;
    }
    
    getIp(){
        return ipp;
    }
    
    getUser(){
        return useridp;
    }
    
    
    
    
}

module.exports = UserId;