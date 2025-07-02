import { API_KEY, BASE_URL } from "../constants";

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

export const fetchPopularMovies = async (page: number): Promise<MoviesPage> => {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const data = await res.json();
    return data;
};
