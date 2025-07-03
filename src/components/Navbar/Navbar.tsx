import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
            </ul>
        </nav>
    );
};

export default Navbar;
