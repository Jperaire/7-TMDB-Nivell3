import { useNavigate } from "react-router-dom";
import styles from "./MovieList.module.css";
import { useQuery } from "@tanstack/react-query";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

type Movie = {
    id: number;
    title: string;
    release_date: string;
    backdrop_path: string;
    vote_average: number;
};

const fetchPopularMovies = async (): Promise<Movie[]> => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results;
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
