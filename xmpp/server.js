/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

var xmpp = require('node-xmpp-server'), server = null;
var press = require('@xmpp/xml');

var ltx = require('node-xmpp-core').ltx;

var xmp = require('node-xmpp')

var c2s = null;
var eventChain = [];

module.exports.start = function () {

    c2s = new xmp.server.C2S.TCPServer({
        port: 5278,
        domain: 'localhost'
    })

    c2s.on('error', function (err) {
        console.log('c2s error: ' + err.message)
    })

    c2s.on('connect', function (client) {
        c2s.on('register', function (opts, cb) {
            cb(new Error('register not supported'))
        })

        // allow anything
        client.on('authenticate', function (opts, cb) {
            eventChain.push('authenticate')

            console.log(opts);
            console.log('server:', opts.username, opts.password, 'AUTHENTICATING')
            if (opts.password === 'secret') {
                console.log('server:', opts.username, 'AUTH OK')
                cb(null, opts)
            } else {
                console.log('server:', opts.username, 'AUTH FAIL')
                cb(false)
            }

        })

        client.on('online', function () {
            eventChain.push('online')
        })

        client.on('stanza', function () {
            eventChain.push('stanza')
            client.send(
                    new xmpp.Message({type: 'chat'})
                    .c('body')
                    .t('Hello there, little client.')
                    )
        })

        client.on('disconnect', function () {
            eventChain.push('disconnect')
        })

        client.on('end', function () {
            eventChain.push('end')
        })

        client.on('close', function () {
            eventChain.push('close')
        })

        client.on('error', function () {
            eventChain.push('error')
        })
    })

};



module.exports.startServer = function (done) {
    // Sets up the server.
    server = new xmpp.C2S.TCPServer({
        port: 5225,
        domain: 'localhost'
    });

    // On connection event. When a client connects.
    server.on('connection', function (client) {
        // That's the way you add mods to a given server.
        console.log('CONNECTATE');
        // Allows the developer to register the jid against anything they want
        client.on('register', function (opts, cb) {
            console.log('REGISTER')
            cb(true)
        })

        // Allows the developer to authenticate users against anything they want.
        client.on('authenticate', function (opts, cb) {
            console.log('server:', opts.username, opts.password, 'AUTHENTICATING')
            if (opts.password === 'secret') {
                console.log('server:', opts.username, 'AUTH OK')
                cb(null, opts)
            } else {
                console.log('server:', opts.username, 'AUTH FAIL')
                cb(false)
            }
        })

        client.on('online', function () {
            console.log('server:', client.jid.local, 'ONLINE')
        })

        // Stanza handling
        client.on('stanza', function (stanza) {
            console.log('server:', client.jid.local, 'stanza', stanza.toString())
            /* var from = stanza.attrs.from
             stanza.attrs.from = stanza.attrs.to
             stanza.attrs.to = from
             client.send(stanza) */

            if (stanza.is('iq')) {
                var iq = new xmpp.Element(
                        'iq',
                        {to: stanza.attrs.to, type: 'set'})
                        .c('query', {xmlns: 'http://jabber.org/protocol/muc#owner'})
                        .c('x', {xmlns: 'jabber:x:data', type: 'submit'})
                
                client.send(stanza) 
            }




        })

        // On Disconnect event. When a client disconnects
        client.on('disconnect', function () {
            console.log('server:', client.jid.local, 'DISCONNECT')
        })
    })

    server.on('listening', done)




}



