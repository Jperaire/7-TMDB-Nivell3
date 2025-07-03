import { useAuth } from "../../context/AuthContext";
import auth from "../../firebase/firebaseConfig";
import styles from "./Navbar.module.css";
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
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? styles.active : ""
                        }
                    >
                        Inicio
                    </NavLink>
                </li>

                {user ? (
                    <>
                        <li>
                            <NavLink
                                to="/movies"
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                Películas
                            </NavLink>
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
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                Registro
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
