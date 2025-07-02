import { API_KEY, BASE_URL } from "../constants";

export const fetchDetailsMovie = async (id: string) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error("Error fetching movie details");
    const data = await res.json();
    return data;
};
