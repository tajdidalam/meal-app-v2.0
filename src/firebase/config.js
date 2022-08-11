//import firebase and all the necessary services from firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//firebase configuration object from firebase site
// const firebaseConfig = {
//   apiKey: "AIzaSyD9lPpNd5zD513EI4bGr_n955XT8XYCJEo",
//   authDomain: "test-meal-99c72.firebaseapp.com",
//   projectId: "test-meal-99c72",
//   storageBucket: "test-meal-99c72.appspot.com",
//   messagingSenderId: "194701566786",
//   appId: "1:194701566786:web:6302f4496181999f891edb",
// };

const firebaseConfig = {
 
};

//initialize firebase
firebase.initializeApp(firebaseConfig);

//initialize all the services one by one
const db = firebase.firestore();
const auth = firebase.auth();

//timestamp

const timestamp = firebase.firestore.Timestamp;

//now export all the initialized services to use in other components and hooks
export { db, auth, timestamp };
