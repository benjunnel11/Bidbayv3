// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, FacebookAuthProvider, signInWithPopup,fetchSignInMethodsForEmail } from 'firebase/auth';
import { getStorage } from 'firebase/storage';



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9QrGNwA8paE0ZpfiR_dn9Sv21DysmoXA",
    authDomain: "bidbay-4fab7.firebaseapp.com",
    projectId: "bidbay-4fab7",
    storageBucket: "bidbay-4fab7.appspot.com",
    messagingSenderId: "992672602033",
    appId: "1:992672602033:web:8f4445a8d512db09b18f90",
    measurementId: "G-59EN630QV7"
};

const checkSignInMethods = async (email) => {
    try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        console.log('Sign-in methods:', methods);
    } catch (error) {
        console.error('Error fetching sign-in methods:', error);
    }
};

const fbAuthProvider = new FacebookAuthProvider();
fbAuthProvider.addScope('email'); // Ensure email permission is requested

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional: only if you need analytics

// Initialize Firebase Auth
const auth = getAuth(app); 
// Initialize Firestore
const firestore = getFirestore(app);
// Initialize Storage
const storage = getStorage(app);



// Export Firestore and Auth for use in other files
export { auth, firestore, storage, checkSignInMethods};

export const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, fbAuthProvider);
        return result; // Ensure you return the result directly
    } catch (error) {
        console.error("Error during Facebook login:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};