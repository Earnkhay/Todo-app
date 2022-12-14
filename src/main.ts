import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/all.css'
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzwoVt1vYlIiwvoK1JbJa_9M0Y25w6VbA",
  authDomain: "todo-app-8e836.firebaseapp.com",
  projectId: "todo-app-8e836",
  storageBucket: "todo-app-8e836.appspot.com",
  messagingSenderId: "635743242245",
  appId: "1:635743242245:web:1e7ce49e6baae9076b746c"
};

// const app = createApp(App);

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
