/**
 * Created by David on 29.03.2017.
 */
import * as firebase from "firebase";
var L = require('leaflet');

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyBwYBLW7TCGJH0HjFWAgAMw_iQe5YQQO98",
    authDomain: "mapapp-9d5a2.firebaseapp.com",
    databaseURL: "https://mapapp-9d5a2.firebaseio.com",
    storageBucket: "mapapp-9d5a2.appspot.com",
    messagingSenderId: "981242849200"
};
firebase.initializeApp(config);

document.write("TEST");


firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

