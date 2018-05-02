/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




var cliente;
var mongo;
var datam;


const xmpp = require('node-xmpp-server');




module.exports.clientes = function (arrayClinete) {

    cliente = arrayClinete;


};

module.exports.getclientes = function () {

    return cliente;


};


module.exports.db = function (db, data) {

    mongo = db;
    datam = data;

};



module.exports.iq = function (value, client) {




    if (value.is("iq")) {


        var query = null;
        if (value.attrs.type === "get") {

            query = value.getChild('query', "jabber:iq:roster");

            mongo.model("xmpps", datam).find({}, function (err, docs) {

                var n = 0;
                var correr = true;


                while (correr) {

                    var key = Object.keys(docs[0].client[n]);


                    if (key[0] === (client.jid.local + "@" + client.serverdomain)) {
                        if (docs[0].client[n][client.jid.local + "@" + client.serverdomain].data.nome === client.jid.local) {

                            correr = false;

                            var items = docs[0].client[n][client.jid.local + "@" + client.serverdomain].iq

                            value.attrs.type = "result";

                            items.push("john@localhost");

                            items.forEach(function (fn) {

                                try {
                                    query.c("item", {jid: fn});
                                } catch (error) {

                                }

                            });







                            value.attrs.to = value.attrs.from;




                            client.send(value);

                        }



                    }

                    n++;
                }

            });



        }


        if (value.attrs.type === "set" && (query = value.getChild('query', "jabber:iq:roster"))) {

           

            value.attrs.type = "result";
            mongo.model("xmpps", datam).find({}, function (err, docs) {

                docs[0].client[client.jid.username + "@" + client.serverdomain].iq
                docs[0].save(function (err) {

                    if (!err) {

                    }





                });





            });



        }
    }

    if (value.is("presence")) {

        //  var status = value.getChild('status');


        mongo.model("xmpps", datam).find({}, function (err, docs) {

            var n = 0;
            var correr = true;
            while (correr) {


                var key = Object.keys(docs[0].client[n]);
                if (key[0] === (client.jid.local + "@" + client.serverdomain)) {
                    if (docs[0].client[n][client.jid.local + "@" + client.serverdomain].data.nome === client.jid.local) {

                        correr = false;

                        var items = docs[0].client[n][client.jid.local + "@" + client.serverdomain].iq

                        items.push("johnathan@localhost");

                        items.forEach(function (fn) {


                            cliente.forEach(function (cl) {

                                if ((cl.jid.local + "@" + cl.serverdomain) === fn) {

                                    cl.send(new xmpp.Stanza('presence', {from: fn, to: value.attrs.from}));

                                } else {



                                    console.log(new xmpp.Stanza('presence', {from: fn, type: "unavailable", to: value.attrs.from}));



                                    cl.send(new xmpp.Stanza('presence', {from: fn, type: "unavailable", to: value.attrs.from}));
                                }

                            });








                        });


                    }

                }

                n++;
            }

        });




    }


    if (value.is("message")) {

 console.log(value);
        cliente.forEach(function (cl) {

            if ((cl.jid.local + "@" + cl.serverdomain) === value.attrs.to) {

                cl.send(value);


            }


        });



        /*  value.children.forEach(function (fn) {
         
         switch (fn.name) {
         case "composing" :
         cliente.forEach(function (cl) {
         
         if ((cl.jid.local + "@" + cl.serverdomain) === value.attrs.to) {
         cl.send(value);
         }
         });
         
         break;
         
         case "paused" :
         
         cliente.forEach(function (cl) {
         
         if ((cl.jid.local + "@" + cl.serverdomain) === value.attrs.to) {
         cl.send(value);
         }
         });
         
         break;
         
         
         
         default:
         
         break;
         }
         
         
         }); */













    }

}
