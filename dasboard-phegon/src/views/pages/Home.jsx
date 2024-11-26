import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
    const { userInfo } = useSelector((state) => state.auth);

    if (userInfo.role === "ADMIN") {
        return <Navigate to={"/admin/dashboard"} />;
    }
    if (userInfo.role === "VENDOR") {
        return <Navigate to={"/vendor/dashboard"} />;
    } else {
        return <Navigate to={"/login"} />;
    }
};

export default Home;
