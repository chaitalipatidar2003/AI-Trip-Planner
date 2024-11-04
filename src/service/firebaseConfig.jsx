// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBWMu2wRT-lrsTPvIsLIOs5i55QDi_-tSk",
  authDomain: "ai-trip-a4eeb.firebaseapp.com",
  projectId: "ai-trip-a4eeb",
  storageBucket: "ai-trip-a4eeb.appspot.com",
  messagingSenderId: "235305145084",
  appId: "1:235305145084:web:7961d664cb82d1c4a23d79",
  measurementId: "G-41J8ND1318"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db=getFirestore(app);



// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2024, 11, 16);
//     }
//   }
// }