import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAKaTDwlLbcCjJn4JBL9XYksvYqarFeq8",
  authDomain: "auth-pentstark.firebaseapp.com",
  projectId: "auth-pentstark",
  storageBucket: "auth-pentstark.firebasestorage.app",
  messagingSenderId: "515644664207",
  appId: "1:515644664207:web:c351ae5cf80fb2b2b303fa",
  measurementId: "G-CG2ERSD13J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Set persistence to local storage (synchronous setup)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("❌ Firebase Persistence Error:", error);
});

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Configure GitHub Auth Provider
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user:email');
githubProvider.setCustomParameters({
  allow_signup: 'true'
});

export default app;
