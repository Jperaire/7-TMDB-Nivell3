import styles from "./DetailsPage.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IMAGE_BASE_URL } from "../../constants";
import { fetchDetailsMovie } from "../../api/movieDetails";
import ActorsList from "../../components/AutorsList/ActorsList";

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    name: string;
    logo_path?: string | null;
    origin_country?: string;
}

interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

interface Movie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollection | null;
    budget: number;
    genres: Genre[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: { iso_3166_1: string; name: string }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

const DetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: movie,
        isLoading,
        isError,
        error,
    } = useQuery<Movie>({
        queryKey: ["movie", id],
        queryFn: () => fetchDetailsMovie(id!),
    });

    if (isLoading) {
        return <p className={styles.container}>Cargando detalles...</p>;
    }

    if (isError) {
        return (
            <p className={styles.container}>
                Error: {(error as Error).message}
            </p>
        );
    }

    if (!movie) {
        return <p className={styles.container}>No se encontró la película.</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {movie.title} ({movie.release_date?.slice(0, 4)})
            </h1>
            <h2 className={styles.tagline}>{movie.tagline}</h2>
            {movie.poster_path && (
                <img
                    className={styles.poster}
                    src={IMAGE_BASE_URL + movie.poster_path}
                    alt={movie.title}
                />
            )}

            <p className={styles.overview}>{movie.overview}</p>

            <div className={styles.genresContainer}>
                {movie.genres?.map((genre) => (
                    <span key={genre.id} className={styles.genreBubble}>
                        {genre.name}
                    </span>
                ))}
            </div>

            <p className={styles.info}>
                <strong>Duración:</strong> {movie.runtime} min
            </p>

            <p className={styles.info}>
                <strong>Valoración:</strong> {movie.vote_average} ⭐ (
                {movie.vote_count} votos)
            </p>

            <p className={styles.info}>
                <strong>Estado:</strong> {movie.status}
            </p>

            <p className={styles.info}>
                <strong>Presupuesto:</strong> ${movie.budget?.toLocaleString()}
            </p>

            <p className={styles.info}>
                <strong>Recaudación:</strong> ${movie.revenue?.toLocaleString()}
            </p>

            <p className={styles.info}>
                <strong>Idioma original:</strong>{" "}
                {movie.original_language?.toUpperCase()}
            </p>

            <p className={styles.info}>
                <strong>Idiomas hablados:</strong>{" "}
                {movie.spoken_languages
                    ?.map((lang) => lang.english_name)
                    .join(", ")}
            </p>

            <p className={styles.info}>
                <strong>Compañías productoras:</strong>{" "}
                {movie.production_companies?.map((pc) => pc.name).join(", ")}
            </p>

            {movie.belongs_to_collection && (
                <div className={styles.info}>
                    <strong>Pertenece a la colección:</strong>{" "}
                    {movie.belongs_to_collection.name}
                    <br />
                    <img
                        src={
                            IMAGE_BASE_URL +
                            movie.belongs_to_collection.poster_path
                        }
                        alt={movie.belongs_to_collection.name}
                        className={styles.collectionImage}
                    />
                </div>
            )}

            <div className={styles.links}>
                {movie.homepage && (
                    <a href={movie.homepage} target="_blank">
                        Web oficial
                    </a>
                )}

                {movie.imdb_id && (
                    <a
                        href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                        target="_blank"
                    >
                        Ver en IMDB
                    </a>
                )}
            </div>
            <ActorsList movieId={movie.id.toString()} />
        </div>
    );
};

export default DetailsPage;
