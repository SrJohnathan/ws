/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';


var WS = require('ws');
const url = require('url');
var webs;


class WSProto {

    constructor(port) {

        var obj = [];
        let soad = null;


        webs = new WS.Server({server: port});

        webs.on("connection", function connection(so, req) {

            console.log("connection");

            console.log("aarays " + Object.keys(obj).length);

            so.on('message', function message(message) {


                var json = JSON.parse(message);

				console.log("datas :" + message);
				
				
                if (json.method === "open" && json.key === '5895689569855698') {

                    if (obj.length > 0) {
                        var existe = false;
                        var obtmp = null

                        obj.forEach(function (ob) {
                            if (ob.id === json.id) {
                                obtmp = ob;
                                existe = true;
                            }
                        });

                        if (existe === false) {

                            console.log("add :" + json.id);
							
                            obj.push({socket: so, id: json.id});

                            var datas = {to: json.id, id: "system", value: 'data', status: "ONLI"}


                            if ('locahostAd' === json.id) {

                                soad = so;

                                var data = {to: json.id, id: "system", value: 'data', status: "ONLI", precesse: obj.length, method: 'open'};

                                so.send(JSON.stringify(data));


                            } else {

                                if (soad !== null) {

                                    soad.send(JSON.stringify({to: 'locahostAd', id: "system", method: 'ADD', idadd: json.id, precesse: obj.length}));
                                }

                                so.send(JSON.stringify(datas));
                            }




                        } else {

                            console.log("novamente :" + obtmp.id + "nn "+ obj.indexOf(obtmp));

                            obj.splice(obj.indexOf(obtmp), 1, {socket: so, id: json.id});

                            console.log("aarays " + Object.keys(obj).length);

                            var datas = {to: json.id, id: "system", value: 'data', status: "ONLI"};

                            if ('locahostAd' === json.id) {

                                soad = so;

                                var data = {to: json.id, id: "system", value: 'data', status: "ONLI", precesse: obj.length, method: 'open'};


                                so.send(JSON.stringify(data));

                            } else {

                                if (soad !== null) {

                                    soad.send(JSON.stringify({to: 'locahostAd', id: "system", method: 'ADD', idadd: json.id, precesse: obj.length}));
                                }
                                so.send(JSON.stringify(datas));
                            }



                        }





                    } else {


                        obj.push({socket: so, id: json.id});

                        var datas = {to: json.id, id: "system", value: 'data', status: "ONLI"};


                        if ('locahostAd' === json.id) {

                            soad = so;

                            var data = {to: json.id, id: "system", value: 'data', status: "ONLI", precesse: obj.length, method: 'open'};

                            so.send(JSON.stringify(data));


                        } else {

                            if (soad !== null) {

                                soad.send(JSON.stringify({to: 'locahostAd', id: "system", method: 'ADD', idadd: json.id, precesse: obj.length}));
                            }

                            so.send(JSON.stringify(datas));
                        }
                    }



                }


//{"data":{"barcode":"014002","fun":"CONSULTA"},"fn":"VF","id":"b71e9632-5bed-4ce2-bea6-d976e6678e4b","key":"5895689569855698","method":"men","plataform":"MOB","status":"ONLI","to":"b71e9632-5bed-4ce2-bea6-d976e7678e4b"}




                if (json.method === "men" && json.key === '5895689569855698') {

                    var to = json.to;
                    var id = json.id;

                    var fun = json.data.fun;



                    for (var i = 0; i < obj.length; i++) {
                        var sok = obj[i].socket;
                        var idt = obj[i].id;
                        if (idt === to) {

                            var datas = json;

							if(sok.readyState === WS.OPEN){
								 sok.send(JSON.stringify(datas));
							}
                           
                            
                        }

                    }


                    webs.clients.forEach(function each(client) {
                        if (client !== so && client.readyState === WS.OPEN) {





                        }
                    });



                }

            });

            so.on('error', function err(err) {

                console.log(so.readyState);
                console.log(err);
                webs.clients.forEach(function each(client) {
                    if (client === so) {

                        obj.forEach(function each(ob) {

                            if (client === ob.socket) {
                                obj.splice(obj.indexOf(ob), 1);

                            }


                        });

                    }



                });

            }


            );

            so.on('listening', function listening() {



            });


        });






    }

    intervall() {

        const interval = setInterval(function ping() {
            webs.clients.forEach(function each(ws) {
                if (ws.isAlive === false)
                    return ws.terminate();

                ws.isAlive = false;
                ws.ping(noop);
            });
        }, 30000);

    }

}




function noop() {}

function heartbeat() {
    this.isAlive = true;
}

module.exports = WSProto

















