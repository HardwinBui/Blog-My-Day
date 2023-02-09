// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQmk7Beb7KJpGs8EqZdvS3Tewggn2sALY",
  authDomain: "blog-my-day-7d858.firebaseapp.com",
  projectId: "blog-my-day-7d858",
  storageBucket: "blog-my-day-7d858.appspot.com",
  messagingSenderId: "971790409913",
  appId: "1:971790409913:web:67bc490b64772881b7bb68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);
export default storage;