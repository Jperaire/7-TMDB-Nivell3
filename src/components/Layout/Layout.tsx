import { Outlet, NavLink } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = () => {
    return (
        <>
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

            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
