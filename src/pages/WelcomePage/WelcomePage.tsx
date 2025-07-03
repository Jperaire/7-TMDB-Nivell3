import { useNavigate } from "react-router-dom";
import styles from "./WelcomePage.module.css";
import StyledButton from "../../components/Button/StyledButton";

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.welcomeH1}>
                Películas y series sin límites y mucho más
            </h1>
            <p className={styles.welcomeP}>¿Quieres ver algo ya? </p>
            <StyledButton onClick={() => navigate("/movies")}>
                Escoge tu película
            </StyledButton>
        </div>
    );
};

export default WelcomePage;
