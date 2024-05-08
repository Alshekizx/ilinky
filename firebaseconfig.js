// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAt_D1fm4Xj5T98zkAQCv9jJQCVwP06Ow",
  authDomain: "ilinky.firebaseapp.com",
  databaseURL: "https://ilinky-default-rtdb.firebaseio.com",
  projectId: "ilinky",
  storageBucket: "ilinky.appspot.com",
  messagingSenderId: "727450339928",
  appId: "1:727450339928:web:f7ca8949cb7c06e413982d",
  measurementId: "G-3XJCQM1VH6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
