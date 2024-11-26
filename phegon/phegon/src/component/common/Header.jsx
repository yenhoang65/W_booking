import { Link, useNavigate } from "react-router-dom";
import logoPhegon from "../../../public/image/logof.png";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { user_reset } from "../store/reducer/authReducer";
import { RxQuestionMarkCircled } from "react-icons/rx";
import Vnx from "../../../public/image/Vn@3x.png";
import { MdOutlineBedroomChild } from "react-icons/md";
import { PiAirplaneInFlightFill } from "react-icons/pi";
import { GiWorld } from "react-icons/gi";
import { FaCar, FaTaxi } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import RoomSearch from "./RoomSearch";
import { useState } from "react";

const Header = () => {
    const { username } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };
    const logout = () => {
        const confirmLogout = window.confirm(
            "Bạn có chắc chắn muốn đăng xuất không?"
        );

        if (confirmLogout) {
            localStorage.removeItem("token");
            dispatch(user_reset());
            navigate("/");
        }
    };
    return (
        <div>
            <nav className="navbar   h-[80px] bg-[#003b95]">
                <div className="container flex justify-between w-[1200px] m-auto items-center text-[#FFF]">
                    <div className="navbar-brand flex items-center h-[75px] gap-2 text-[20px] font-bold">
                        <img
                            className="w-[45px]  cursor-pointer"
                            src={logoPhegon}
                            alt=""
                        />
                        <Link className="mt-1" to="/">
                            Phegon.Booking
                        </Link>
                    </div>
                    <ul className="navbar-ul flex gap-3 text-[17px] font-[600] ">
                        <li className="p-2">
                            <Link to="/">VND</Link>
                        </li>
                        <li className="p-2 flex">
                            <Link to="/">
                                <img
                                    className="h-6 rounded-full mt-[1px]"
                                    src={Vnx}
                                    alt=""
                                />
                            </Link>
                        </li>
                        <li className="p-2">
                            <Link to="/">
                                <RxQuestionMarkCircled className="text-[27px]" />
                            </Link>
                        </li>

                        {/* <li className="p-2">
                        <Link to="/profile">Profile</Link>
                    </li> */}

                        {username ? (
                            <>
                                <li className="mt-[8px]">
                                    <Link
                                        to="/dashboard"
                                        className="py-1 px-3  text-[#FFF] border bg-[#FF5B26] rounded-full ml-5"
                                    >
                                        {username}
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="cursor-pointer mt-[9px] flex items-center gap-2   hover:text-[#FF5B26] ml-2"
                                    >
                                        Logout
                                        <IoMdLogOut className=" " />
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="rounded-[999px] hover:text-[#FFFF] hover:bg-[#FF5B26] p-2">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="rounded-[999px] hover:text-[#FFFF] hover:bg-[#FF5B26] p-2">
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <section className="relative bg-[#003b95] pt-[20px] pb-[30px] h-[330px] text-[#FFF] ">
                <div className="w-[1150px] m-auto flex flex-wrap gap-[30px] cursor-pointer">
                    <div className="flex gap-3 font-semibold items-center border px-4 py-2 rounded-full border-white">
                        <MdOutlineBedroomChild className="text-[20px]" /> Stay
                    </div>
                    <div className="flex gap-3 font-semibold items-center  px-4 py-2 rounded-full ">
                        <PiAirplaneInFlightFill className="text-[20px]" />
                        Flight
                    </div>
                    <div className="flex gap-3 font-semibold items-center  px-4 py-2 rounded-full ">
                        <GiWorld className="text-[20px]" /> Flight + Hotel
                    </div>
                    <div className="flex gap-3 font-semibold items-center  px-4 py-2 rounded-full ">
                        <FaCar className="text-[20px]" /> Car rental
                    </div>
                    <div className="flex gap-3 font-semibold items-center  px-4 py-2 rounded-full ">
                        <FaMapLocationDot className="text-20px]" /> Place to
                        visit
                    </div>

                    <div className="flex gap-3 font-semibold items-center  px-4 py-2 rounded-full ">
                        <FaTaxi className="text-[20px]" /> Taxi
                    </div>
                </div>

                <div className="py-[64px] w-[1150px] m-auto ">
                    <h3 className="text-[48px] font-[700]">
                        Find your next property
                    </h3>
                    <p className="text-[24px] pt-4">
                        Find hotel deals, home stays and more...
                    </p>
                </div>

                <div className="absolute left-[180px] -bottom-[40px]">
                    <RoomSearch handleSearchResult={handleSearchResult} />
                </div>
            </section>
        </div>
    );
};

export default Header;
