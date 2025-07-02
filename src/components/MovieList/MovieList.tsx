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

type MoviesPage = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
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
    } = useInfiniteQuery<MoviesPage, Error>({
        queryKey: ["movies"],
        queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
            fetchPopularMovies(pageParam),

        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.total_pages
                ? lastPage.page + 1
                : undefined,
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

    const pages = data?.pages as MoviesPage[] | undefined;

    return (
        <section className={styles.section}>
            <ul className={styles.container}>
                {pages?.map((page) =>
                    page.results.map((movie) => (
                        <li
                            key={movie.id}
                            className={styles.card}
                            onClick={() => navigate(`/movies/${movie.id}`)}
                        >
                            <div className={styles.text}>
                                <h3>{movie.title}</h3>
                                <p>{movie.release_date}</p>
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
