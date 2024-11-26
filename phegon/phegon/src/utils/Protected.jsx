import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectUser = () => {
    const { username } = useSelector((state) => state.auth);

    if (username) {
        return <Outlet />;
    } else {
        <Navigate to={"/login"} replace={true} />;
    }
};

export default ProtectUser;
