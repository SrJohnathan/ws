/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */







class ConnectionDB {

    construtor(databaseName, collention) {

        this.colle;
        this.colletion = collention;
        this.databaseName = databaseName;
        this.client;
        this.doc;
    }

    start(callback) {

        
    }
    
    

    init() {

        


    }

    update(namespace, value) {



        var val = {};
        val[namespace] = value;



        if (colle !== null) {

            ConnectionDB.colle.updateOne({}, {$set: val}, function (err, result) {

                if (!err) {

                    return false;

                } else {
                    return true;
                }

            });

            console.log(colle)
        }


    }
    
    insert(namespace, value) {



        
    }

}



module.exports = ConnectionDB;


module.exports.path = function ( {Object:values}, {String:key}) {

    return values[key];

};