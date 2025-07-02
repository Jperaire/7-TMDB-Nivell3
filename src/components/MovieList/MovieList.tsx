import { useNavigate } from "react-router-dom";
import styles from "./MovieList.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../../api/popularMovies";
import { IMAGE_BASE_URL } from "../../constants";

type Movie = {
    id: number;
    title: string;
    release_date: string;
    backdrop_path: string;
    vote_average: number;
};

const MovieList = () => {
    const navigate = useNavigate();

    const {
        data: movies,
        isLoading,
        isError,
        error,
    } = useQuery<Movie[]>({
        queryKey: ["movies"],
        queryFn: fetchPopularMovies,
    });

    if (isLoading) return <p>Cargando...</p>;
    if (isError)
        return <p>Error al cargar pelis: {(error as Error).message}</p>;

    return (
        <section className={styles.section}>
            <h2>Listado de Películas</h2>
            <ul className={styles.container}>
                {movies?.map((movie) => (
                    <li
                        key={movie.id}
                        className={styles.card}
                        onClick={() => navigate(`/movies/${movie.id}`)}
                    >
                        <div className={styles.text}>
                            <h3>{movie.title}</h3>
                            <p>{movie.release_date}</p>
                        </div>
                        <div className={styles.rate}>
                            <p>{movie.vote_average}</p>
                        </div>
                        <img
                            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                            alt={`Imagen de ${movie.title}`}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MovieList;
