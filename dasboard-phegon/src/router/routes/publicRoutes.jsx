import Login from "../../views/auth/Login";
import Register from "../../views/auth/Register";
import Home from "../../views/pages/Home";
import Unauthorized from "../../views/Unauthorized";

const publicRoutes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
];
export default publicRoutes;
