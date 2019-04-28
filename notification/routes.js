var express = require('express')
var router = express.Router()
var userController = require('./controller')
var  util = require('../util.js')
var verifyToken 	 = require('../verify-token');
var jwt    			 = require('jsonwebtoken');
var notificationService = require('./service')

router.use('/', function (req, res, next) {
  console.log( req.method +' ' + req.originalUrl)
  next()
})

router.get('/', function (req, res) {
  res.send('Welcome to home dading REST api server')
})

router.post('/sendNotificationMessage', function (req, res) {
  notificationService.sendNotificationMessage(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})

router.post('/sendGroupMessage', function (req, res) {
  notificationService.sendGroupMessage(req.body).then(function (success) {
      console.log("All Done.");
      res.send(success);
  },function (faliure) {
      res.send(faliure)
  })
})
module.exports = router
