import { API_KEY, BASE_URL } from "../constants";

export const actorDetails = async (actorId: string) => {
    const [detailsRes, creditsRes] = await Promise.all([
        fetch(
            `${BASE_URL}/person/${actorId}?api_key=${API_KEY}&language=es-ES`
        ),
        fetch(
            `${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}&language=es-ES`
        ),
    ]);

    if (!detailsRes.ok || !creditsRes.ok) {
        throw new Error("Error al obtener los detalles o créditos del actor");
    }

    const details = await detailsRes.json();
    const credits = await creditsRes.json();

    return {
        ...details,
        movies: credits.cast,
    };
};
