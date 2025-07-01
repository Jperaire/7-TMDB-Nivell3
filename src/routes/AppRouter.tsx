import { Routes, Route } from "react-router-dom";
import MoviePage from "../pages/MoviesPage/MoviePage";
import NotFound from "../pages/NotFound/NotFound";
import DetailPage from "../pages/DetailsPage/DetailsPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MoviePage />} />
            <Route path="/movies/:id" element={<DetailPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
