import { useEffect } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const DetailsPage = () => {
    const { id } = useParams();

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        ).then((res) =>
            res.json().then((data) => {
                console.log(data);
            })
        );
    }, [id]);

    return <>Esta es la MovieDetailPage de {id}</>;
};

export default DetailsPage;
