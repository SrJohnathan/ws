/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';


const mysql = require('mysql');

var connection;

class  Banco {

    constructor(host, usermane, password, database) {



        connection = mysql.createConnection({
            host: host,
            user: usermane,
            password: password,
            database: database

        });



    }

    get(sql, dados) {

        connection.connect(function (err) {

            if (!err) {

                connection.query(sql, function (err, result, filds) {

                    if (!err) {
                        dados(result);


                    } else {
                        console.log(err);
                        dados(err);

                    }


                    //  connecti.end();

                });


            } else {

                dados(err.message);


            }


        });

    }
    
}

module.exports = Banco;