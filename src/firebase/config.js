//import firebase and all the necessary services from firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//firebase configuration object from firebase site
// const firebaseConfig = {
//  
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
