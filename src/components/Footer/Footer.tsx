import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            © {new Date().getFullYear()} TMDB. Todos los derechos reservados.
        </footer>
    );
};
