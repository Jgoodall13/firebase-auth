import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyAXaGPIHL2jdCm54gHKbQD-mcHqMBYj9hU",
    authDomain: "fun-food-friends-715b2.firebaseapp.com",
    databaseURL: "https://fun-food-friends-715b2.firebaseio.com",
    projectId: "fun-food-friends-715b2",
    storageBucket: "fun-food-friends-715b2.appspot.com",
    messagingSenderId: "486936639536"
  };
var fire = firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default fire;