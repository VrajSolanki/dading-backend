var Q = require('q');
var fs = require('fs');
var request = require('request');
var  config = require('../config')
var loginChatModel = require('./model')

// exports.getBhavCopy = function(){
//     var deferred = Q.defer();
// 	userModel.getBhavCopy().then(function(success){
// 		deferred.resolve(success);
// 	},function(error){
// 		console.error(error);
// 		deferred.reject("error occured");
// 	})
//     return deferred.promise;
// }

