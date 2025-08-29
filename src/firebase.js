// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBV9bYQe0humTL8ys1b8DYuQzvnrZBNKoo",
  authDomain: "healthcare-web-e84da.firebaseapp.com",
  projectId: "healthcare-web-e84da",
  storageBucket: "healthcare-web-e84da.appspot.com",   // ✅ fixed
  messagingSenderId: "353020257026",
  appId: "1:353020257026:web:16c9a1eee361cefaa9d81b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

export async function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

export async function signOutUser() {
  return signOut(auth);
}