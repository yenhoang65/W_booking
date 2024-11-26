import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNav } from "../navigation/index";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { user_reset } from "../store/reducer/authReducer";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [allNav, setAllNav] = useState([]);

    const { role, userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    useEffect(() => {
        const navs = getNav(role);
        setAllNav(navs);
    }, [userInfo.role]);

    const logout = () => {
        const confirmLogout = window.confirm(
            "Bạn có chắc chắn muốn đăng xuất không?"
        );

        if (confirmLogout) {
            localStorage.removeItem("token");
            dispatch(user_reset());
            navigate("/login");
        }
    };

    return (
        <div>
            <div
                className={`w-[260px] fixed bg-[#153243] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all -left-[260px] lg:left-0 `}
            >
                <div className="h-[70px] flex justify-center items-center">
                    <Link to={"/"} className="w-[180px] h-[50px]">
                        <h1 className="flex justify-center font-roboto-slab items-center text-[3rem] font-bold text-[#FFF]">
                            Phegon.
                        </h1>
                    </Link>
                </div>

                <div className="px-[16px] mt-[20px]">
                    <ul className="text-black">
                        {allNav.map((nav) => (
                            <li key={nav.id} className="mt-[10px] text-[20px]">
                                <Link
                                    to={nav.path}
                                    className={`flex items-center justify-start gap-[12px] hover:pl-4 transition-all mb-1  w-full cursor-pointer px-[20px] py-[9px] rounded-999 ${
                                        pathname === nav.path
                                            ? "bg-[#dad7cd] font-bold shadow-indigo-500/50 duration-500 text-[#000]"
                                            : "text-[#FFF] font-[500] duration-200"
                                    }`}
                                >
                                    <span>{nav.icon}</span>
                                    <span>{nav.title}</span>
                                </Link>
                            </li>
                        ))}

                        <li onClick={logout}>
                            <button className="flex text-[#FFF] font-semibold duration-200 items-center justify-start gap-[12px] hover:pl-4 transition-all mb-1  w-full cursor-pointer px-[20px] py-[9px] rounded-999">
                                <span>
                                    <IoMdLogOut />
                                </span>
                                <span>Log Out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
