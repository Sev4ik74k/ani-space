import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminPanel from "../pages/AdminPanel";

const PrivateAdminRoute = () => {
    const role = useSelector((state) => state.auth.role);

    if (role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <AdminPanel />;
};

export default PrivateAdminRoute;
