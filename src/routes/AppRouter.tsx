import { Routes, Route } from "react-router-dom";
import MoviePage from "../pages/MoviesPage/MoviePage";
import NotFound from "../pages/NotFound/NotFound";
import DetailPage from "../pages/DetailsPage/DetailsPage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/movies/:id" element={<DetailPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
