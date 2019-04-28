 var Q = require('q');
 var  config = require('../config')
 const { Pool, Client } = require('pg')
 var sma = require('sma');

exports.connestionPg = function(){
    var deferred = Q.defer();
    console.log("connecting to database...");
    const pool = new Pool(config.pg)

    pool.query('SELECT * FROM public.user', (err, res) => {
      console.log(res.rows);
    pool.end()
    })

    const client = new Client(config.pg)
    client.connect()

    client.query('SELECT NOW()', (err, res) => {
    //console.log(err, res)
    client.end()
    })
    return deferred.promise;
}


// exports.getBhavCopy = function(){
//     var deferred = Q.defer();
//     var connection = mysql.createConnection(config.pg);

//     connection.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         //Make SQL statement:
//         var sql = "select * from bhavcopycore LIMIT 10;";

//         //Execute the SQL statement, with the value array:
//         connection.query(sql, function (err, result) {
//             if (err){
//                 console.log(err);
//                 connection.end(function(err) {
//                              // The connection is terminated now
//                             console.log("Connection is terminated now.");
//                             deferred.reject("error occured");
//                 }); 
//             }else{
//                 //console.log("Number of records inserted: " + result.affectedRows);
//                 connection.end(function(err) {
//                             // The connection is terminated now
//                             console.log("Connection is terminated now.");
//                             deferred.resolve(result)
//                             //next();
//                 }); 
//             }
//         });
//     });
//     return deferred.promise;
// }

// exports.deleteBhavCopy = function(date){
//     var deferred = Q.defer();
//     var connection = mysql.createConnection(config.mysql);

//     connection.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         //Make SQL statement:
//         var sql = "delete * from bhavcopycore where timestamp ="+date+";";

//         //Execute the SQL statement, with the value array:
//         connection.query(sql, function (err, result) {
//             if (err){
//                 console.log(err);
//                 connection.end(function(err) {
//                              // The connection is terminated now
//                             console.log("Connection is terminated now.");
//                             deferred.reject("error occured");
//                 }); 
//             }else{
//                 //console.log("Number of records inserted: " + result.affectedRows);
//                 connection.end(function(err) {
//                             // The connection is terminated now
//                             console.log("Connection is terminated now.");
//                             deferred.resolve(result)
//                             //next();
//                 }); 
//             }
//         });
//     });
//     return deferred.promise;
// }
