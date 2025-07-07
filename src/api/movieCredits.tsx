import { API_KEY, BASE_URL } from "../constants";

export interface Actor {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export const fetchMovieCredits = async (movieId: string): Promise<Actor[]> => {
    const res = await fetch(
        `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    if (!res.ok) {
        throw new Error("Error al obtener el elenco");
    }
    const data = await res.json();
    return data.cast;
};
