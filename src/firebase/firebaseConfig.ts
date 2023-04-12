import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHfc_PWzEu-lPUo7iS96584b-_Mt1lEa8",
  authDomain: "streaming-music-service.firebaseapp.com",
  projectId: "streaming-music-service",
  storageBucket: "streaming-music-service.appspot.com",
  messagingSenderId: "877396276722",
  appId: "1:877396276722:web:34eda99b55abfd8beb676b",
  measurementId: "G-9F1GDDPVD5"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDatabase = getFirestore(firebaseApp);

export const mockFirebaseConfig = Object.assign({}, firebaseConfig);