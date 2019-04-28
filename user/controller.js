var userService = require('./service')
var Q = require('q');
//var  util = require('../util.js')

exports.userLogin = function (userDetails) {
    var deferred = Q.defer();
    if(!userDetails.email){
        var response = {
			status :401,
			message:"email required."
		}
        deferred.reject(response);
    }
    if(!userDetails.password){
        var response = {
			status :401,
			message:"password required."
		}
		deferred.reject(response);
    }
	userService.userLogin(userDetails).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};



exports.userRegister = function (userDetails) {
    var deferred = Q.defer();
    if(!userDetails.email){
        var response = {
			status :401,
			message:"email required."
		}
        deferred.reject(response);
    }
    if(!userDetails.password){
        var response = {
			status :401,
			message:"password required."
		}
		deferred.reject(response);
    }
	userService.userRegister(userDetails).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};



exports.userUpdate = function (userDetails) {
    var deferred = Q.defer();
    if(!userDetails.userid){
        var response = {
			status :401,
			message:"userid required."
		}
        deferred.reject(response);
    }

	userService.userUpdate(userDetails).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};


exports.getUserById = function (userid) {
    var deferred = Q.defer();
    if(!userid){
        var response = {
			status :401,
			message:"userid required."
		}
        deferred.reject(response);
    }

	userService.getUserById(userid).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.giveRatingToUser = function (reqObject) {
    var deferred = Q.defer();
    if(!reqObject.user_id){
        var response = {
			status :401,
			message:"user_id required."//use.r_id is the user id of user whom rating is given
		}
        deferred.reject(response);
	}
	if(!reqObject.id){
        var response = {
			status :401,
			message:"user_id required."//id is the user id of user who is giving rating.
		}
        deferred.reject(response);
    }

	userService.giveRatingToUser(reqObject).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.addUserTopics = function (reqObject) {
    var deferred = Q.defer();
    if(!reqObject.user_id){
        var response = {
			status :401,
			message:"user_id required." 
		}
        deferred.reject(response);
	}

	userService.addUserTopics(reqObject).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.getRatingsByUserId = function (userid) {
    var deferred = Q.defer();
    if(!userid){
        var response = {
			status :401,
			message:"userid required."
		}
        deferred.reject(response);
    }

	userService.getRatingsByUserId(userid).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.getTopicsByUserId = function (userid) {
    var deferred = Q.defer();
    if(!userid){
        var response = {
			status :401,
			message:"userid required."
		}
        deferred.reject(response);
    }

	userService.getTopicsByUserId(userid).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.addConnection = function (reqObject) {
    var deferred = Q.defer();
    if(!reqObject.sender){
        var response = {
			status :401,
			message:"sender required." 
		}
        deferred.reject(response);
	}

	if(!reqObject.receiver){
        var response = {
			status :401,
			message:"receiver required." 
		}
        deferred.reject(response);
	}

	if(!reqObject.status){
        var response = {
			status :401,
			message:"status required." 
		}
        deferred.reject(response);
	}

	userService.addConnection(reqObject).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.updateConnectionStatus = function (reqObject) {
    var deferred = Q.defer();
    if(!reqObject.status){
        var response = {
			status :401,
			message:"status required." 
		}
        deferred.reject(response);
	}

	if(!reqObject.connection_id){
        var response = {
			status :401,
			message:"connection_id required." 
		}
        deferred.reject(response);
	}

	userService.updateConnectionStatus(reqObject).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};


exports.getUserById = function (userid) {
    var deferred = Q.defer();
    if(!userid){
        var response = {
			status :401,
			message:"userid required."
		}
        deferred.reject(response);
    }

	userService.getUserById(userid).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.search = function (text) {
    var deferred = Q.defer();
    if(!text){
        var response = {
			status :401,
			message:"text required."
		}
        deferred.reject(response);
    }

	userService.search(text).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.getRecommendation = function (userid) {
    var deferred = Q.defer();
    if(!userid){
        var response = {
			status :401,
			message:"id required."
		}
        deferred.reject(response);
    }

	userService.getRecommendation(userid).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.getTrenDingers = function (userid) {
    var deferred = Q.defer();

	userService.getTrenDingers().then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.getAchievementByUserId = function (userid) {
    var deferred = Q.defer();
    if(!userid){
        var response = {
			status :401,
			message:"userid required."
		}
        deferred.reject(response);
    }

	userService.getAchievementByUserId(userid).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.addConversation = function (reqObject) {
    var deferred = Q.defer();
    if(!reqObject.sender){
        var response = {
			status :401,
			message:"sender required." 
		}
        deferred.reject(response);
	}

	if(!reqObject.reciever){
        var response = {
			status :401,
			message:"reciever required." 
		}
        deferred.reject(response);
	}

	if(!reqObject.start){
        var response = {
			status :401,
			message:"start required." 
		}
        deferred.reject(response);
	}

	userService.addConversation(reqObject).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};

exports.updateConversation = function (reqObject) {
    var deferred = Q.defer();
    if(!reqObject.conversation_id){
        var response = {
			status :401,
			message:"conversation_id required." 
		}
        deferred.reject(response);
	}

	if(!reqObject.enddate){
        var response = {
			status :401,
			message:"enddate required." 
		}
        deferred.reject(response);
	}

	userService.updateConversation(reqObject).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};


exports.connectionSortAndFilter = function (reqObject) {
    var deferred = Q.defer();
	userService.connectionSortAndFilter(reqObject).then(function (success) {
		var response = {
			status :200,
			message:success
		}
		deferred.resolve(response)
	},function (faliure) {
		var response = {
			status :401,
			message:faliure
		}
		deferred.reject(response)
	})
	return deferred.promise;
};
