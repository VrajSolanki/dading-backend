var express = require('express')
var router = express.Router()
var userController = require('./controller')
var  util = require('../util.js')
//var verifyToken 	 = require('../verify-token');
//var jwt    			 = require('jsonwebtoken');
var notificationService = require('../notification/service')

router.use('/', function (req, res, next) {
  console.log( req.method +' ' + req.originalUrl)
  next()
})

router.get('/', function (req, res) {
  res.send('Welcome to home dading REST api server')
})

router.post('/login', function (req, res) {
  console.log(req.body);
  userController.userLogin(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
      notificationService.sendNotificationMessage(success.fcm_id,success.datamsg).then(function (success) {
        console.log("All Done.",success);
       // res.send(success);
    },function (faliure) {
      console.log(faliure);
    })
  },function (faliure) {
      res.send(faliure)
  })
})

router.post('/register', function (req, res) {
  console.log(req.body);

  userController.userRegister(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})

router.put('/update', function (req, res) {
  console.log(req.body);

  userController.userUpdate(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})

router.get('/search', function (req, res) {
  userController.search(req.query.text).then(function (success) {
      console.log("All Done.");
      res.send(success);

  },function (faliure) {
      res.send(faliure)
  })
})

router.post('/ratings', function (req, res) {
  console.log(req.body);
  userController.giveRatingToUser(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})

router.post('/topics', function (req, res) {
  console.log(req.body);
  userController.addUserTopics(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})

router.get('/getRatingsByUserId/:id', function (req, res) {
  console.log(req.params.id);

  userController.getRatingsByUserId(req.params.id).then(function (success) {
      console.log("All Done.");
      res.send(success);

  },function (faliure) {
      res.send(faliure)
  })
})

router.get('/getTopicsByUserId/:id', function (req, res) {
  console.log(req.params.id);

  userController.getTopicsByUserId(req.params.id).then(function (success) {
      console.log("All Done.");
      res.send(success);

  },function (faliure) {
      res.send(faliure)
  })
})

router.post('/connection', function (req, res) {
  console.log(req.body);
  userController.addConnection(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})

router.put('/updateConnectionStatus', function (req, res) {
  console.log(req.body);

  userController.updateConnectionStatus(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})

router.get('/getRecommendation/:id', function (req, res) {
  console.log(req.params.id);

  userController.getRecommendation(req.params.id).then(function (success) {
      console.log("All Done.");
      res.send(success);

  },function (faliure) {
      res.send(faliure)
  })
})

router.get('/getTrenDingers/', function (req, res) {

  userController.getTrenDingers().then(function (success) {
      console.log("All Done.");
      res.send(success);

  },function (faliure) {
      res.send(faliure)
  })
})

router.get('/getAchievementByUserId/:id', function (req, res) {
  console.log(req.params.id);

  userController.getAchievementByUserId(req.params.id).then(function (success) {
      console.log("All Done.");
      res.send(success);

  },function (faliure) {
      res.send(faliure)
  })
})


router.get('/:id', function (req, res) {
  console.log(req.params.id);

  userController.getUserById(req.params.id).then(function (success) {
      console.log("All Done.");
      res.send(success);

  },function (faliure) {
      res.send(faliure)
  })
})

router.post('/conversation', function (req, res) {
  console.log(req.body);
  userController.addConversation(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})

router.put('/conversation', function (req, res) {
  console.log(req.body);
  userController.updateConversation(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})

router.post('/connectionSortAndFilter', function (req, res) {
  console.log(req.body);
  userController.connectionSortAndFilter(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})

module.exports = router
