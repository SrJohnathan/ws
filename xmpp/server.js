/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

var xmpp = require('node-xmpp-server'), server = null
var Stanza = require('node-xmpp-core').Stanza
var ltx = require('node-xmpp-core').ltx;
var stanzaMethod = require('./Stanza');





const mongo = require("mongoose");
var Schema = mongo.Schema;
mongo.connect("mongodb://localhost:27017/ajsoftware");



var array = [];

module.exports.startServer = function (domain) {

    // Sets up the server.
    server = new xmpp.C2S.TCPServer({
        port: 5222,
        domain: domain
    });


    var data = new Schema({

        client: {}


    });


    stanzaMethod.db(mongo,data);

    server.on('connection', function (client) {


        client.on('register', function (opts, cb) {


            var val = {};

            var date = {nome: opts.username, type: 1, plataform: "null", pass: opts.password};

            val[opts.username + "@" + client.serverdomain] = {data: date, pressence: {}, menssage: {},iq:{}};

            mongo.model("xmpp", data).create({client: val});

            cb(true);


        });

        client.on('authenticate', function (opts, cb) {

            mongo.model("xmpps", data).find({}, function (err, docs) {

                docs.forEach(function (d) {

                    if (d['client'][opts.username + "@" + client.serverdomain].data.nome === opts.username) {

                        console.log('server:', opts.username, 'AUTH SUCESS');

                        if (d['client'][opts.username + "@" + client.serverdomain].data.pass === opts.password) {

                            cb(null, opts);

                            array.push(client);

                            stanzaMethod.clientes(array);
                            console.log('server:', 'ARRAY:' + array.length);


                        } else {

                            console.log('server:', opts.username, 'AUTH FAIL');

                            cb(false);

                        }

                    } else {

                        cb(false);
                    }
                });
            });


        })

        client.on('online', function () {


            console.log('server:', client.jid.local, 'ONLINE');
            
            
            

        });

        client.on('stanza', function (stanza) {

            stanzaMethod.iq(stanza, client);


        });


        client.on('disconnect', function () {

           
            if (array.length > 0) {

                if (client.jid.local === array[array.indexOf(client)].jid.local) {

                    array.splice(array.indexOf(client), 1);
                    
                    stanzaMethod.clientes(array);

                    console.log('server:', 'DISCONNECT:' + client.jid.local);
                    console.log('server:', 'ARRAY:' + array.length);

                }
            }

        });
    })

    //  server.on('listening', done)





}



