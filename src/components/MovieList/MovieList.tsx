import { useNavigate } from "react-router-dom";
import styles from "./MovieList.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../../api/popularMovies";
import { IMAGE_BASE_URL } from "../../constants";
import { useEffect } from "react";

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
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery<Movie[], Error>({
        queryKey: ["movies"],
        queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
            fetchPopularMovies(pageParam),

        getNextPageParam: (pages) => pages.length + 1,
    });

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) return <p>Cargando...</p>;
    if (isError)
        return <p>Error al cargar pelis: {(error as Error).message}</p>;

    return (
        <section className={styles.section}>
            <h2>Listado de Películas</h2>
            <ul className={styles.container}>
                {data?.pages.map((page) =>
                    page.map((movie) => (
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
                    ))
                )}
            </ul>
        </section>
    );
};

export default MovieList;
