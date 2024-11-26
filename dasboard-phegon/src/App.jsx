import { useEffect, useState } from "react";
import "./App.css";
import Router from "./router/Router";
import { getRoutes } from "./router/routes";
import { useDispatch, useSelector } from "react-redux";
import { getMyInfo } from "./store/reducer/authReducer";
import publicRoutes from "./router/routes/publicRoutes";
// import { jwtDecode } from "jwt-decode";

function App() {
    const { token } = useSelector((state) => state.auth);

    const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

    const dispatch = useDispatch();

    useEffect(() => {
        const routes = getRoutes();
        setAllRoutes([...allRoutes, routes]);
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(getMyInfo());
        }
    }, [token]);

    return <Router allRoutes={allRoutes} />;
}

export default App;
