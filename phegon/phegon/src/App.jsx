// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "react-multi-carousel/lib/styles.css";
// import "./App.css";
// import Header from "./component/common/header";
// import HomePage from "./component/home/homepage";
// import Login from "./component/auth/Login";
// import Register from "./component/auth/Register";
// import Developer from "./component/page/developer/Developer";
// import ProtectUser from "./utils/Protected";
// import Dashboard from "./component/page/dashboard";
// import Index from "./component/page/dashboard/Index";
// import Profile from "./component/page/dashboard/Profile";
// import { useEffect } from "react";
// import { getMyInfo } from "./component/store/reducer/authReducer";
// import { useDispatch, useSelector } from "react-redux";
// import Hotel from "./component/page/hotel/Hotel";
// import Room from "./component/page/room/Room";
// import RoomDetail from "./component/page/room/RoomDetail";
// import Checkout from "./component/page/checkout/Checkout";
// import Chat from "./component/page/chat/Chat";
// // import Profile from "./component/page/profille/Profile";

// function App() {
//     const dispatch = useDispatch();
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         dispatch(getMyInfo());
//     }, []);
//     return (
//         <BrowserRouter>
//             {/* <Header /> */}
//             <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/developer" element={<Developer />} />
//                 <Route path="/hotel" element={<Hotel />} />
//                 <Route path="/room" element={<Room />} />
//                 <Route path="/room/detail/:roomId" element={<RoomDetail />} />
//                 <Route path="/checkout" element={<Checkout />} />
//                 <Route path="/chat" element={<Chat username="Cong" />} />
//                 <Route path="/dashboard" element={<ProtectUser />}>
//                     <Route path="" element={<Dashboard />}>
//                         <Route path="" element={<Index />} />
//                         <Route path="profile" element={<Profile />} />
//                     </Route>
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "./App.css";
import HomePage from "./component/home/homepage";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Developer from "./component/page/developer/Developer";
import ProtectUser from "./utils/Protected";
import Dashboard from "./component/page/dashboard";
import Index from "./component/page/dashboard/Index";
import Profile from "./component/page/dashboard/Profile";
import { useEffect, useState } from "react";
import { getMyInfo } from "./component/store/reducer/authReducer";
import { useDispatch } from "react-redux";
import Hotel from "./component/page/hotel/Hotel";
import Room from "./component/page/room/Room";
import RoomDetail from "./component/page/room/RoomDetail";
import Checkout from "./component/page/checkout/Checkout";
import Chat from "./component/page/chat/Chat";
import EnterChat from "./component/page/chat/EnterChat";
import { Buffer } from "buffer";
import process from "process";
import ResetPasswordPage from "./component/auth/ResetPasswordPage ";
window.Buffer = Buffer;
window.process = process;
function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const [userName, setUserName] = useState(
        localStorage.getItem("username") || ""
    );

    useEffect(() => {
        dispatch(getMyInfo());
    }, []);

    const handleSetUserName = (name) => {
        setUserName(name);
        localStorage.setItem("username", name);
    };

    // Hàm xử lý khi người dùng logout
    const handleLogout = () => {
        setUserName("");
        localStorage.removeItem("username");
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    element={<Login onLoginSuccess={handleSetUserName} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/developer" element={<Developer />} />
                <Route path="/hotel" element={<Hotel />} />
                <Route path="/room" element={<Room />} />
                <Route path="/room/detail/:roomId" element={<RoomDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/resetPassword" element={<ResetPasswordPage />} />

                {/* Nếu chưa có username, render EnterChat */}
                <Route
                    path="/chat"
                    element={
                        userName ? (
                            <Chat username={userName} onLogout={handleLogout} />
                        ) : (
                            <EnterChat onJoin={handleSetUserName} />
                        )
                    }
                />

                <Route path="/dashboard" element={<ProtectUser />}>
                    <Route path="" element={<Dashboard />}>
                        <Route path="" element={<Index />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
