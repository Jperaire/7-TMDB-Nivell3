import { Routes, Route } from "react-router-dom";
import MoviePage from "../pages/MoviesPage/MoviePage";
import NotFound from "../pages/NotFound/NotFound";
import DetailPage from "../pages/DetailsPage/DetailsPage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import Layout from "../components/Layout/Layout";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<WelcomePage />} />
                <Route path="movies" element={<MoviePage />} />
                <Route path="movies/:id" element={<DetailPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
