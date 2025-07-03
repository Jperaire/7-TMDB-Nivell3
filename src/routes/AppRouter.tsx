import { Routes, Route } from "react-router-dom";
import MoviePage from "../pages/MoviesPage/MoviePage";
import NotFound from "../pages/NotFound/NotFound";
import DetailPage from "../pages/DetailsPage/DetailsPage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import Layout from "../components/Layout/Layout";
import AuthForm from "../pages/AuthForm/AuthForm";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<WelcomePage />} />
                <Route path="login" element={<AuthForm isLogin />} />
                <Route path="register" element={<AuthForm isLogin={false} />} />
                <Route
                    path="movies"
                    element={
                        <PrivateRoute>
                            <MoviePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="movies/:id"
                    element={
                        <PrivateRoute>
                            <DetailPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
