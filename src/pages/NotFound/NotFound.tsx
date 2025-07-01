import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>🤔 ¡Oops!</h1>
            <p>Parece que te has perdido...</p>

            <img
                src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif"
                alt="Gato programador"
                className={styles.gif}
            />

            <Link to="/" className={styles.button}>
                🏠 Volver al inicio
            </Link>
        </div>
    );
};

export default NotFound;
