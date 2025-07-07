import styles from "./ActorDetailsPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { actorDetails } from "../../api/actorDetails";
import { IMAGE_BASE_URL } from "../../constants";

const ActorDetailsPage = () => {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const goToMovieDetails = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    const {
        data: actor,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["actor", id],
        queryFn: () => actorDetails(id!),
    });

    if (isLoading) return <p>Cargando actor...</p>;
    if (isError || !actor) return <p>Error al cargar actor</p>;

    return (
        <div className={styles.container}>
            <h1>{actor.name}</h1>

            {actor.profile_path && (
                <img
                    src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                    alt={actor.name}
                    className={styles.actorImage}
                />
            )}

            <p>
                <strong>Fecha de nacimiento:</strong> {actor.birthday}
            </p>
            {actor.place_of_birth && (
                <p>
                    <strong>Lugar de nacimiento:</strong> {actor.place_of_birth}
                </p>
            )}
            <p>
                <strong>Biografía:</strong>
            </p>
            <p>{actor.biography || "No hay biografía disponible."}</p>

            <h2>Películas en las que ha trabajado</h2>
            <ul className={styles.moviesGrid}>
                {actor.movies.map((movie) => (
                    <li
                        key={movie.id}
                        className={styles.movieCard}
                        onClick={() => goToMovieDetails(movie.id)}
                    >
                        {movie.poster_path ? (
                            <img
                                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                alt={movie.title}
                            />
                        ) : (
                            <div className={styles.noImage}>Sin imagen</div>
                        )}
                        <p>{movie.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActorDetailsPage;
