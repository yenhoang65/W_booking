import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";

const ProtectRoute = ({ route, children }) => {
    const { role, userInfo } = useSelector((state) => state.auth);

    console.log("route.role" + route.role);
    console.log("userInfo.role" + userInfo.role);

    if (route.role && role.includes(route.role)) {
        return children;
    }
    if (!role.includes(route.role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    if (userInfo === "") {
        console.log("first");
        return <Navigate to="/login" replace />;
    }
};

ProtectRoute.propTypes = {
    route: PropTypes.shape({
        role: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
};

export default ProtectRoute;
