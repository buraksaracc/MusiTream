import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: "AIzaSyCoxlTibRgy1TEvBG26G_FH6z4rs6rvIrk",
      authDomain: "musitream-98631.firebaseapp.com",
      projectId: "musitream-98631",
      storageBucket: "musitream-98631.appspot.com",
      messagingSenderId: "992055288420",
      appId: "1:992055288420:web:9417ec748b0f31578af571",
      measurementId: "G-BVGCX47X6B",
    })
  : firebase.app();

const db = firebaseConfig.firestore();
const auth = firebase.auth();

export { db, auth };
