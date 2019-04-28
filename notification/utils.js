var admin = require("firebase-admin");
const uuidv4 = require('uuid/v4');

var serviceAccount = require("./da-ding-firebase-adminsdk-jc8gm-0291b4bba1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://da-ding.firebaseio.com"
});

var uid = uuidv4();;

exports.createCustomToken = function(uid){
  admin.auth().createCustomToken(uid)
  .then(function(customToken) {
    // Send token back to client
  })
  .catch(function(error) {
    console.log('Error creating custom token:', error);
  });  
}

exports.sendGroupMessage = function(registrationTokens,){
  // Create a list containing up to 100 registration tokens.
  // These registration tokens come from the client FCM SDKs.
  const registrationTokens = [
    'YOUR_REGISTRATION_TOKEN_1',
    // …
    'YOUR_REGISTRATION_TOKEN_N',
  ];

  const message = {
    data: {msg: data, time: '2:45'},
    tokens: registrationTokens,
  }

  admin.messaging().sendMulticast(message)
    .then((response) => {
      console.log(response.successCount + ' messages were sent successfully');
  });
}

exports.sendNotificationMessage = function(registrationToken){
  // This registration token comes from the client FCM SDKs.
    var registrationToken = 'YOUR_REGISTRATION_TOKEN';

    var message = {
      data: {
        score: '850',
        time: '2:45'
      },
      token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
    });
}