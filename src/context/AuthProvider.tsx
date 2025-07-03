// src/contexts/AuthProvider.tsx
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { onAuthStateChanged, User } from "firebase/auth";
import auth from "../firebase/firebaseConfig";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return unsub;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
