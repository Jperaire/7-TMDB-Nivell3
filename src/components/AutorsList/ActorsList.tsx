// src/components/ActorsList/ActorsList.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieCredits, Actor } from "../../api/movieCredits";
import StyledButton from "../Button/StyledButton";
import styles from "./ActorsList.module.css";
import { IMAGE_BASE_URL } from "../../constants";
import { Link } from "react-router-dom";

interface Props {
    movieId: string;
}

const ActorsList = ({ movieId }: Props) => {
    const [showList, setShowList] = useState(false);

    const {
        data: cast,
        isLoading,
        isError,
    } = useQuery<Actor[]>({
        queryKey: ["cast", movieId],
        queryFn: () => fetchMovieCredits(movieId),
        enabled: showList,
    });

    const toggleActors = () => {
        setShowList((prev) => !prev);
    };

    return (
        <>
            <StyledButton onClick={toggleActors}>
                {showList ? "Ocultar actores" : "Ver listado de actores"}
            </StyledButton>

            {showList && (
                <div>
                    {isLoading && <p>Cargando actores...</p>}
                    {isError && <p>Error al cargar los actores.</p>}
                    {cast && (
                        <ul className={styles.actorsGrid}>
                            {cast.map((actor) => (
                                <li key={actor.id} className={styles.actorCard}>
                                    <Link
                                        to={`/actors/${actor.id}`}
                                        className={styles.actorLink}
                                    >
                                        {actor.profile_path ? (
                                            <img
                                                src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                                                alt={actor.name}
                                                className={styles.actorImage}
                                            />
                                        ) : (
                                            <div className={styles.noImage}>
                                                Sin foto
                                            </div>
                                        )}
                                        <div className={styles.actorInfo}>
                                            <strong>{actor.name}</strong>
                                            <p>{actor.character}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
};

export default ActorsList;
