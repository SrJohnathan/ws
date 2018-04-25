/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongo = require('mongoose');
var Schema = mongo.Schema;






/* global db */
module.exports = function (app) {


    var data = new Schema({

        domin: String

    });

    return db.model('Pressence', data);


};

