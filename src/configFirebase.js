import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/messaging";

var config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();
db.enablePersistence({
  synchronizeTabs: true
});
let storage = firebase.storage();

let messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;

export default {
  db,
  storage,
  messaging
};
