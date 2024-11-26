import MainLayout from "../../layout/MainLayout";
import { privateRoutes } from "./privateRoutes";
import ProtectRoute from "./protecRoute";
export const getRoutes = () => {
    privateRoutes.map((r) => {
        r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>;
    });
    return {
        path: "/",
        element: <MainLayout />,
        children: privateRoutes,
    };
};
