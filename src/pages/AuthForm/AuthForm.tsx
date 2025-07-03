// src/pages/AuthForm.tsx
import { useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase/firebaseConfig";
import StyledButton from "../../components/Button/StyledButton";

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();

    const handle = async () => {
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, pwd);
            } else {
                await createUserWithEmailAndPassword(auth, email, pwd);
            }
            navigate("/movies");
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h1>{isLogin ? "Iniciar sesión" : "Registrarse"}</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
            />
            <StyledButton onClick={handle}>
                {isLogin ? "Entrar" : "Crear cuenta"}
            </StyledButton>
        </div>
    );
};

export default AuthForm;
