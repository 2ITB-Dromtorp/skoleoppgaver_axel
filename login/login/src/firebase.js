// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD-Iq2g1mzx_3MarTepo4zwYIUbfbIl_Bw",
    authDomain: "it-tut-e5234.firebaseapp.com",
    projectId: "it-tut-e5234",
    storageBucket: "it-tut-e5234.appspot.com",
    messagingSenderId: "982327912126",
    appId: "1:982327912126:web:75adba756e8627e93620ef"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);