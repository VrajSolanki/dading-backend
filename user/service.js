var Q = require('q');
var fs = require('fs');
//var request = require('request');
//var  config = require('../config')
var userModel = require('./model')
const uuidv4 = require('uuid/v4');
exports.userLogin = function(userDetails){
    var deferred = Q.defer();
	userModel.userLogin(userDetails).then(function(success){
		if(userDetails.loginType == 'ga'){
			userDetails['password'] = "google"
		}else if(userDetails.loginType == 'fa'){
			userDetails['password'] = "facebook"
		}
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject(error);
	})
    return deferred.promise;
}


exports.userRegister = function(userDetails){
	var deferred = Q.defer();
	userDetails['id'] = uuidv4();
	userModel.userRegister(userDetails).then(function(success){
		success["datamsg"] = "Welcome!!";
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject(error);
	})
    return deferred.promise;
}

exports.userRegisterImplicit = function(userDetails){
	var deferred = Q.defer();
	//userDetails['id'] = uuidv4();
	if(userDetails.loginType == 'ga'){
		userDetails['password'] = "google"
	}else if(userDetails.loginType == 'fa'){
		userDetails['password'] = "facebook"
	}
	userModel.userRegisterImplicit(userDetails).then(function(success){
		success["datamsg"] = "Welcome!!";
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject(error);
	})
    return deferred.promise;
}

exports.userUpdate = function(userDetails){
	var deferred = Q.defer();
	userModel.userUpdate(userDetails).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.getUserById = function(userid){
	var deferred = Q.defer();
	userModel.getUserById(userid).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.giveRatingToUser = function(reqObject){
	var deferred = Q.defer();
	reqObject['rating_id'] = uuidv4();
	reqObject['user_rating_id'] = uuidv4();
	userModel.giveRatingToUser(reqObject).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.addUserTopics = function(reqObject){
	var deferred = Q.defer();
	reqObject['topic_id'] = uuidv4();
	reqObject['user_topic_id'] = uuidv4();
	userModel.addUserTopics(reqObject).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}


exports.getRatingsByUserId = function(reqObject){
	var deferred = Q.defer();
	userModel.getRatingsByUserId(reqObject).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.getTopicsByUserId = function(reqObject){
	var deferred = Q.defer();
	userModel.getTopicsByUserId(reqObject).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.addConnection = function(userDetails){
	var deferred = Q.defer();
	userDetails['id'] = uuidv4();
	userModel.addConnection(userDetails).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject(error);
	})
    return deferred.promise;
}

exports.updateConnectionStatus = function(userDetails){
	var deferred = Q.defer();
	userModel.updateConnectionStatus(userDetails).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.search = function(userDetails){
	var deferred = Q.defer();
	userModel.search(userDetails).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.getRecommendation = function(userDetails){
	var deferred = Q.defer();
	userModel.getRecommendation(userDetails).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.getTrenDingers = function(){
	var deferred = Q.defer();
	userModel.getTrenDingers().then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.getAchievementByUserId = function(reqObject){
	var deferred = Q.defer();
	userModel.getAchievementByUserId(reqObject).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.addConversation = function(reqObject){
	var deferred = Q.defer();
	reqObject['id'] = uuidv4();
	userModel.addConversation(reqObject).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject(error);
	})
    return deferred.promise;
}

exports.updateConversation = function(userDetails){
	var deferred = Q.defer();
	userModel.updateConversation(userDetails).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject(error);
	})
    return deferred.promise;
}

exports.connectionSortAndFilter = function(userDetails){
	var deferred = Q.defer();
	userModel.connectionSortAndFilter(userDetails).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject(error);
	})
    return deferred.promise;
}

exports.myDings = function(userDetails){
	var deferred = Q.defer();
	userModel.myDings(userDetails).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject(error);
	})
    return deferred.promise;
}

exports.myConnections = function(userDetails){
	var deferred = Q.defer();
	userModel.myConnections(userDetails).then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject(error);
	})
    return deferred.promise;
}

exports.getTopics = function(){
	var deferred = Q.defer();
	userModel.getTopics().then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}

exports.getCity = function(){
	var deferred = Q.defer();
	userModel.getCity().then(function(success){
		deferred.resolve(success);
	},function(error){
		console.error(error);
		deferred.reject("error occured");
	})
    return deferred.promise;
}