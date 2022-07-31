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
  apiKey: "AIzaSyAIEIcjOsEuqNMvxpKieKBaurGBh32Y7ek",
  authDomain: "office-meal-43d27.firebaseapp.com",
  projectId: "office-meal-43d27",
  storageBucket: "office-meal-43d27.appspot.com",
  messagingSenderId: "804366085220",
  appId: "1:804366085220:web:7af2e0b471c5edb0900371",
  measurementId: "G-2JL9DLXMC9",
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
