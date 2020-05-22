const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
var cors = require("cors")({
  origin: true
});
const serverKey = require("./serverKey");

admin.initializeApp(functions.config().firebase);
let firestore = admin.firestore();

exports.GeneralSubscription = functions.https.onRequest((request, response) => {
  console.log("token", request.body.token);

  cors(request, response, () => {
    axios
      .post(
        `https://iid.googleapis.com/iid/v1/${request.body.token}/rel/topics/general`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${serverKey}`
          }
        }
      )
      // eslint-disable-next-line promise/always-return
      .then(() => {
        // eslint-disable-next-line promise/no-nesting
        firestore
          .collection("tokens")
          .add({
            token: request.body.token
          })
          // eslint-disable-next-line promise/always-return
          .then(ref => {
            console.log("Document added ID: ", ref.id);
            response.status(200).send(`notifications subscription successful`);
          })
          .catch(err => {
            console.log(err);
            console.log(err.response);
            response.status(500).send({
              message: "Whops! there was an error",
              error: err.response
            });
          });
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
        response.status(500).send({
          message: "Whops! there was an error",
          error: err.response
        });
      });
  });
});

exports.createItem = functions.firestore
  .document("toys/{itemId}")
  .onCreate(event => {
    var item = event.data();

    console.log(item.comment);

    axios
      .post(
        `https://fcm.googleapis.com/fcm/send`,
        {
          to: "/topics/general",
          priority: "high",
          notification: {
            title: "Nuevo juguete",
            body: item.comment,
            click_action: "http://localhost:8888",
            icon:
              "http://localhost:8888/chrome/chrome-installprocess-128-128.png"
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${serverKey}`
          }
        }
      )
      // eslint-disable-next-line promise/always-return
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  });
