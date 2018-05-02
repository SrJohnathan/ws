/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

var xmpp = require('node-xmpp-server'), server = null
var Stanza = require('node-xmpp-core').Stanza
var ltx = require('node-xmpp-core').ltx;
var Plain = xmpp.auth.Plain
var stanzaMethod = require('./Stanza');





const mongo = require("mongoose");
var Schema = mongo.Schema;
 // mongo.connect("mongodb://localhost:27017/ajsoftware");
 
 mongo.connect("mongodb+srv://johnathan:9569john@ajsoftware-guytn.mongodb.net/", {dbName : 'data'});

// mongodb+srv://johnathan:9569john@ajsoftware-guytn.mongodb.net/data



var array = [];

module.exports.startServer = function (domain) {

// Sets up the server.
    server = new xmpp.C2S.TCPServer({
        port: 5222,
        domain: domain
    });

    if (Plain) {

        server.availableSaslMechanisms = [];
        server.registerSaslMechanism(Plain);
    }

    var data = new Schema({

        client: []


    });
    var cltmp = mongo.model("xmpps", data);


    data.pre('set', function (next, path, val, typel) {
        // `this` is the current Document
        this.emit('set', path, val);
        next();
    });




    stanzaMethod.db(mongo, data);


    server.on('connection', function (client) {



        client.on('register', function (opts, cb) {



            cltmp.find({}, function (err, docs) {



                var val = {};


                if (docs.length > 0) {



                    var date = {nome: opts.username, type: 1, plataform: "null", pass: opts.password};


                    val[opts.username + "@" + client.serverdomain] = {data: date, pressence: {}, menssage: [], iq: []};


                    var post = new cltmp;
                    docs[0].client.push(val);
                    docs[0].save(function (err) {

                        if (!err) {

                            console.log("opts");
                            cb(null);
                        }





                    });
                } else {

                    var date = {nome: opts.username, type: 1, plataform: "null", pass: opts.password};
                    val[opts.username + "@" + client.serverdomain] = {data: date, pressence: {}, menssage: [], iq: []};
                    mongo.model("xmpp", data).create({client: [val]});
                    cb(null);
                }




            });
        });
        client.on('authenticate', function (opts, cb) {

            if (opts.saslmech === Plain.id) {
                mongo.model("xmpps", data).find({}, function (err, docs) {

                    var securite = false;
                    docs[0].client.forEach(function (d) {

                        if (!securite) {
                            if (d[Object.keys(d)].data.nome === opts.username && d[Object.keys(d)].data.pass === opts.password) {

                                console.log('server:', opts.username, 'AUTH SUCESS' + opts.saslmech + ";;;" + Plain.id);


                                cb(null, opts);

                                securite = true;




                            } else {



                            }



                        }










                    })




                });

            }



        })

        client.on('session-started', function () {
            console.log('server:', client.jid.local, 'SESSION');
        });


        client.on('online', function () {



            console.log('server:', client.jid.local, 'ONLINE');



            if (array.length > 0) {

                var exi = false;
                array.forEach(function (cl) {
                    if (cl.jid.local === client.jid.local) {

                        exi = true;


                    }
                });

                if (!exi) {
                    console.log('server:', client.jid.local, 'ADD');
                    array.push(client);
                    stanzaMethod.clientes(array);
                }

            } else {
                console.log('server:', client.jid.local, 'ENTER');
                array.push(client);
                stanzaMethod.clientes(array);
            }


        });
        client.on('stanza', function (stanza) {

         
            stanzaMethod.iq(stanza, client);
        });


        client.on('disconnect', function () {


            if (array.length > 0) {

                if (client === array[array.indexOf(client)]) {

                    array.splice(array.indexOf(client), 1);
                    stanzaMethod.clientes(array);
                    console.log('server:', 'DISCONNECT:' + client.jid.local);

                }
            }

        });
        //  server.on('listening', done)





    });
};


