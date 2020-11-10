import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/messaging";
import "firebase/auth";
import store from "./store";

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

let auth = firebase.auth();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();
db.enablePersistence({
  synchronizeTabs: true
});
let storage = firebase.storage();

let messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;

export default {
  auth,
  db,
  storage,
  messaging
};
