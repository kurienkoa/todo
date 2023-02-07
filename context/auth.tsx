import React, {useContext, useState, useEffect, useRef} from "react";
import {signInWithEmailAndPassword, onAuthStateChanged} from "@firebase/auth";
import {getAuth} from "firebase/auth";
import {IReactNode, IUseAuth} from "../types";

const AuthContext = React.createContext({});

export function useAuth() {
    return useContext(AuthContext) as IUseAuth;
}

export function AuthProvider(props: IReactNode ) {
    const {children} = props;
    const [currentUser, setCurrentUser] = useState<null | {}>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const userInfo = useRef();
    const auth = getAuth();

    function login(email:string, password:string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user);
            setLoading(false)
        })
        return unsubscribe
    }, []);

    const value = {
        currentUser,
        login,
        userInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}