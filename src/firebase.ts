import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAD6Kkts1wY6GmRf8J0_OhcvFhtX-2AAcQ",
  authDomain: "airbubble2-5be80.firebaseapp.com",
  projectId: "airbubble2-5be80",
  storageBucket: "airbubble2-5be80.firebasestorage.app",
  messagingSenderId: "113602611926",
  appId: "1:113602611926:web:afec263523cb4382eed777"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 