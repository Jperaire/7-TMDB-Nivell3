import styles from "./MovieCard.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type Movie = {
    id: number;
    title: string;
    release_date: string;
    backdrop_path: string;
};

const MovieCard = ({ id, title, release_date, backdrop_path }: Movie) => {
    return (
        <>
            <li key={id} className={styles.card}>
                <strong>{title}</strong> — Fecha: {release_date}
                <img
                    src={`${IMAGE_BASE_URL}${backdrop_path}`}
                    alt={`Imagen de ${title}`}
                />
            </li>
        </>
    );
};

export default MovieCard;
