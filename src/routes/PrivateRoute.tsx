import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <p>Cargando...</p>;

    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
