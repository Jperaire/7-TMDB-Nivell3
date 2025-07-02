import { API_KEY, BASE_URL } from "../constants";

type Movie = {
    id: number;
    title: string;
    release_date: string;
    backdrop_path: string;
    vote_average: number;
};

export const fetchPopularMovies = async (page: number): Promise<Movie[]> => {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const data = await res.json();
    return data.results;
};
