import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../Firebase/Firebase.config';


// Set Context API Globally
export const AuthContext = createContext(null);

const UserContext = ({ children }) => {


    // Google Provider.
    const provider = new GoogleAuthProvider();



    // user Authentication.
    const auth = getAuth(app);


    // User State
    const [user, setUser] = useState({});



    // Create An account using Email Method.
    const emailSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }




    // TODO ADD Profile Photo system Later.
    // Set user Name profile Photo
    const setUserNameAndPhoto = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    }



    // User Login system.
    const loginByEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }


    // Sign in with Google 
   const googleLogin = ()=> {
        return signInWithPopup(auth, provider);
    }



    // user SignOut System
    const signOutHandler = ()=> {
        return signOut(auth);
    }


    // Auth Current State Tracker.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        };
    }, [])











    // Context Variable provider.
    const authInfo = { user, emailSignUp, setUserNameAndPhoto, loginByEmail, signOutHandler, googleLogin};




    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;