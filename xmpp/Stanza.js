/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




var cliente;
var mongo;
var datam;







module.exports.clientes = function (arrayClinete) {

    cliente = arrayClinete;


};


module.exports.db = function (db, data) {

    mongo = db;
    datam = data;

};



module.exports.iq = function (value, client) {

    console.log(value);


    if (value.is("iq")) {

        console.log(value);

        if (value.attrs.type === "get") {


            mongo.model("xmpps", datam).find({}, function (err, docs) {

                docs.forEach(function (d) {


                    if (d['client'][client.jid.local + "@" + client.serverdomain].data.nome === client.jid.local) {


                        var cli = d['client'][client.jid.local + "@" + client.serverdomain];
                        if (cli.hasOwnProperty("iq")) {

                           
                        } else {
                            value.attrs.type = "result";
                            client.send(value);
                            
                            
                        }


                    }

                })

            }); 


           
        } 
        
        
        if (value.attrs.type === "set") {
            
            
            
        }
    }

    if (value.is("presenc")) {

        console.log(value);

        if (value.attrs.type === "get") {

            value.attrs.type = "result";

            client.send(value);
        }
    }


    if (value.is("message")) {


        cliente.forEach(function (cl) {

            if ((cl.jid.local + "@" + cl.serverdomain) === value.attes.to) {


                var stanz = new Stanza('message', {to: value.attrs.to, type: value.attrs.type })

                        .c('body').t(value.attrs.body);

                cl.send(stanz);


            }


        });







    }

}
