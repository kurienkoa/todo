import {getAuth} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    // apiKey: process.env.NEXT_PUBLIC_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_APP_ID,
    apiKey: "AIzaSyBn93o6a656EoL2QsDtEXBq2s5_GNw_5bk",
    authDomain: "todo-ec0df.firebaseapp.com",
    projectId: "todo-ec0df",
    storageBucket: "todo-ec0df.appspot.com",
    messagingSenderId: "603314175138",
    appId: "1:603314175138:web:a0e536bc43781197bdebfb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);