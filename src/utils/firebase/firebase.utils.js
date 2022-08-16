// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQm2A7RBVugTgeOvBBkutMYx54sGoOYw0",
    authDomain: "crown-db-bbdea.firebaseapp.com",
    projectId: "crown-db-bbdea",
    storageBucket: "crown-db-bbdea.appspot.com",
    messagingSenderId: "555291918370",
    appId: "1:555291918370:web:98ff626724d0bcff964a7b",
    measurementId: "G-Q423RTR98P"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider()
provider.setCustomParameters()

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    let userSnapshot
    try {
        userSnapshot = await getDoc(userDocRef)
    } catch (error) {
        console.error(error)
        throw error
    }

    if (userSnapshot && !userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            })
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    return userDocRef
}