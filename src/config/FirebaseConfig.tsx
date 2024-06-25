// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/database'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByvVEBwvS7zYOKRAU3w0gEgXHOmyEeEy0",
  authDomain: "dodportal.firebaseapp.com",
  projectId: "dodportal",
  storageBucket: "dodportal.appspot.com",
  messagingSenderId: "892588666236",
  appId: "1:892588666236:web:845b575bd4ddf0f87e08f9"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getStorage(app);
console.log("app setup successfull")
export {app  , database}