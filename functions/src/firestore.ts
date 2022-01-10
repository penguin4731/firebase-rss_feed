import * as functions from "firebase-functions";
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

module.exports = {
  firestore,
};
