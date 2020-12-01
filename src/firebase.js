// import firebase SDK from npm install firebase node package
//core firebase SDK
import firebase from "firebase/app";
// import particular script from documentation
//realtime database library 
import "firebase/database";
// our web app's configuration object ( grab from project settings)
const firebaseConfig = {
    apiKey: "AIzaSyC0JgSeb9EI57_Iw6IXqBuPAXxiyCbKs0c",
    authDomain: "project-5-4d71a.firebaseapp.com",
    databaseURL: "https://project-5-4d71a.firebaseio.com",
    projectId: "project-5-4d71a",
    storageBucket: "project-5-4d71a.appspot.com",
    messagingSenderId: "1036205057382",
    appId: "1:1036205057382:web:8c41c95b4a9c478c1194a7"
};

//initalize our app
firebase.initializeApp(firebaseConfig)

export default firebase;