/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongo = require('mongoose');







/* global db */
module.exports = function (app) {

    var data = new Schema({

        nome: String,

        type: Number,

        plataform: String,

        propi: String,

        pass: String

    });

    return db.model('xmpp', data);


}

