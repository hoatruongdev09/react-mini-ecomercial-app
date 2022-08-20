// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters()

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)
    objectsToAdd.forEach((obj) => {
        const docRef = doc(collectionRef, obj.title.toLowerCase())
        batch.set(docRef, obj)
    })
    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)

    const categoryMap = querySnapshot.docs.reduce((acc, snapshot) => {
        const { title, items } = snapshot.data()
        acc[title.toLowerCase()] = items
        return acc
    }, {})

    return categoryMap
}
export const getCategories = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((snapshot) => {
        const { title, imageUrl } = snapshot.data()
        return { title, imageUrl }
    })
}

export const createUserDocumentFromAuth = async (userAuth, additionalData = {}) => {
    if (!userAuth) { return; }
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
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) { return; }
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) { return }
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => {
    await signOut(auth)
}

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}