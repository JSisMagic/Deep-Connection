// firebase.js

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCfvYBN7RjpI7LJoLX6r7BB_SsPc0TQ3jk', // Firebase Web API Key
    authDomain: 'final-react-project-f8e7f.firebaseapp.com', // Firebase authDomain
    projectId: 'final-react-project-f8e7f', // Firebase project ID
    storageBucket: 'final-react-project-f8e7f.appspot.com', // Your Firebase storageBucket
    messagingSenderId: '1023608608794', // Firebase messagingSenderId
    appId: 'YOUR_APP_ID', // irebase appId
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

export { auth, db, firebase }; // Export the 'firebase' module

