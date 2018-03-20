/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    
    
    var con = req.body.method;
    
    console.log((con));
    
    if(con === 'login'){
        
        var user = req.body.username;
        
        
        if(user === "8458965896582256894589655"){
            
            res.redirect('/admin');
            
        }else{
            res.redirect('/');
        }
        
    }else{
        res.redirect('/');
    }
    
    
});

module.exports = router;