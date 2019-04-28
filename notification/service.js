var Q = require('q');
var notification = require('./utils');
var userModel = require('../user/model');

exports.sendNotificationMessage = function(notificationData,data){
    var deferred = Q.defer();
    notification.sendNotificationMessage(notificationData,data).then(function(success){
        deferred.resolve(success);
    },function(error){
        console.error(error);
        deferred.reject("error occured");
    })
    return deferred.promise;
}

exports.sendGroupMessage = function(notificationData){
    var deferred = Q.defer();
    notification.sendNotificationMessage(notificationData).then(function(success){
        deferred.resolve(success);
    },function(error){
        console.error(error);
        deferred.reject("error occured");
    })
    return deferred.promise;
}
