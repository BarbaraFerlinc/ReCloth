// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANpin1oz66F42gMISTQBukyYvTMlXxfVg",
  authDomain: "recloth-d2a80.firebaseapp.com",
  projectId: "recloth-d2a80",
  storageBucket: "recloth-d2a80.appspot.com",
  messagingSenderId: "846960987711",
  appId: "1:846960987711:web:c84c6331b1697800e8f28a",
  measurementId: "G-CS5TMWLDFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;