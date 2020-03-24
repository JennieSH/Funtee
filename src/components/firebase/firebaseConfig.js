import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC6raKxhs64GktqMem1XS7UWlYAZfRsTww",
    authDomain: "dawan-bfa08.firebaseapp.com",
    databaseURL: "https://dawan-bfa08.firebaseio.com",
    projectId: "dawan-bfa08",
    storageBucket: "dawan-bfa08.appspot.com",
    messagingSenderId: "747978560517",
    appId: "1:747978560517:web:cb48adbed402da10e5b86c",
    measurementId: "G-JV66YR0BZ7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics(); // import firebase from "firebase"; 


export default firebaseConfig;