// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfy6ljtiMJK6jBiBKuTnpKX9xPaQtmqmY",
    authDomain: "movie-ee9f4.firebaseapp.com",
    projectId: "movie-ee9f4",
    storageBucket: "movie-ee9f4.firebasestorage.app",
    messagingSenderId: "569714021234",
    appId: "1:569714021234:web:e3376b8ed9101a5b0ac3eb"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password)=>{
    try{
       await signInWithEmailAndPassword(auth, email, password);
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const logout = ()=>{
    signOut(auth);

}

export {auth, db, login, signup, logout};