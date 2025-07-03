import { createContext, useContext } from "react";
import { User } from "firebase/auth";

interface AuthContext {
    user: User | null;
    loading: boolean;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    loading: true,
});

export const useAuth = () => useContext(AuthContext);
