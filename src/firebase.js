import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzwoVt1vYlIiwvoK1JbJa_9M0Y25w6VbA",
  authDomain: "todo-app-8e836.firebaseapp.com",
  projectId: "todo-app-8e836",
  storageBucket: "todo-app-8e836.appspot.com",
  messagingSenderId: "635743242245",
  appId: "1:635743242245:web:1e7ce49e6baae9076b746c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }