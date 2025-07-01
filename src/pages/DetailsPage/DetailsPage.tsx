import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailsPage.module.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

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
    const [movie, setMovie] = useState<Movie | null>(null);
    const imageBase = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        if (!id) return;

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((data: Movie) => setMovie(data))
            .catch((error) => {
                console.error("Error fetching movie:", error);
            });
    }, [id]);

    if (!movie) {
        return <p className={styles.container}>Cargando detalles...</p>;
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
                    src={imageBase + movie.poster_path}
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
                            imageBase + movie.belongs_to_collection.poster_path
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
        </div>
    );
};

export default DetailsPage;
