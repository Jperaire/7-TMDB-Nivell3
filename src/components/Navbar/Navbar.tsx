import styles from "./Navbar.module.css";

import { useAuth } from "../../context/AuthContext";
import auth from "../../firebase/firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/login");
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        }
    };

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li>
                    <NavLink to="/">Inicio</NavLink>
                </li>

                <div className={styles.rightMenu}>
                    {user ? (
                        <>
                            <li>
                                <NavLink to="/movies">Películas</NavLink>
                            </li>
                            <li>
                                <button
                                    className={styles.logoutBtn}
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">Registro</NavLink>
                            </li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
