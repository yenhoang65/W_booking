// import { FaBorderAll, FaHeart, FaList } from "react-icons/fa";
// import { IoIosHome, IoMdLogOut } from "react-icons/io";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { Link, Outlet } from "react-router-dom";
// import { AiOutlineProfile } from "react-icons/ai";
// import { IoChatboxEllipsesOutline } from "react-icons/io5";
// import Header from "../common/header";
// function Dashboard() {
//     return (
//         <>
//             <Header />
//             <div className="w-[1100px] m-auto">
//                 <div className="">
//                     <div className="w-[90%] mx-auto md-lg:block hidden">
//                         <div>
//                             <button
//                                 // onClick={() => setFilterShow(!filterShow)}
//                                 className="text-center py-3 px-3 bg-green-500 text-white"
//                             >
//                                 <FaList />{" "}
//                             </button>
//                         </div>
//                     </div>

//                     <div className="h-full mx-auto">
//                         <div className="py-5 flex md-lg:w-[90%] mx-auto relative gap-[30px] ">
//                             <div
//                                 className="bg-[#FFF9E5] rounded-lg  "
//                                 // className={`rounded-md z-50 md-lg:absolute ${
//                                 //     filterShow ? "-left-4" : "-left-[360px]"
//                                 // } w-[270px] ml-4 bg-white`}
//                             >
//                                 <ul className="py-2 px-4 text-[#FF5B26]">
//                                     <li className="flex justify-start items-center gap-2 py-2">
//                                         <span className="text-xl">
//                                             <FaBorderAll />
//                                         </span>
//                                         <Link to="/dashboard" className="block">
//                                             MyOrder{" "}
//                                         </Link>
//                                     </li>
//                                     <li className="flex justify-start items-center gap-2 py-2">
//                                         <span className="text-xl">
//                                             <AiOutlineProfile />
//                                         </span>
//                                         <Link
//                                             to="/dashboard/profile"
//                                             className="block"
//                                         >
//                                             Profile{" "}
//                                         </Link>
//                                     </li>
//                                     <li className="flex justify-start items-center gap-2 py-2">
//                                         <span className="text-xl">
//                                             <FaBorderAll />
//                                         </span>
//                                         <Link
//                                             to="/dashboard/my-orders"
//                                             className="block"
//                                         >
//                                             My Orders{" "}
//                                         </Link>
//                                     </li>
//                                     <li className="flex justify-start items-center gap-2 py-2">
//                                         <span className="text-xl">
//                                             <FaHeart />
//                                         </span>
//                                         <Link
//                                             to="/dashboard/my-wishlist"
//                                             className="block"
//                                         >
//                                             Wishlist{" "}
//                                         </Link>
//                                     </li>
//                                     <li className="flex justify-start items-center gap-2 py-2">
//                                         <span className="text-xl">
//                                             <IoChatboxEllipsesOutline />
//                                         </span>
//                                         <Link
//                                             to="/dashboard/chat"
//                                             className="block"
//                                         >
//                                             Chat{" "}
//                                         </Link>
//                                     </li>
//                                     <li className="flex justify-start items-center gap-2 py-2">
//                                         <span className="text-xl">
//                                             <RiLockPasswordLine />
//                                         </span>
//                                         <Link
//                                             to="/dashboard/change-password"
//                                             className="block"
//                                         >
//                                             Change Password{" "}
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>

//                             <div className="w-[calc(100%-270px)] bg-[#FFF9E5] md-lg:w-full rounded-lg">
//                                 <div className="mx-4 md-lg:mx-0">
//                                     <Outlet />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Dashboard;

import { FaBorderAll, FaHeart, FaList } from "react-icons/fa";
import { IoIosHome, IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineProfile } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import Header from "../common/header";

function Dashboard() {
    return (
        <>
            <Header />
            <div className="w-[1100px] m-auto">
                <div className="">
                    <div className="w-[90%] mx-auto md-lg:block hidden">
                        <div>
                            <button className="text-center py-3 px-3 bg-green-500 text-white hover:bg-green-600">
                                <FaList />
                            </button>
                        </div>
                    </div>

                    <div className="h-full mx-auto">
                        <div className="py-5 flex md-lg:w-[90%] mx-auto relative gap-[30px]">
                            <div className="bg-blue-50 rounded-lg">
                                <ul className="py-2 px-4 text-blue-700">
                                    <li className="flex justify-start items-center gap-2 py-2 hover:bg-blue-100 rounded-lg">
                                        <span className="text-xl">
                                            <FaBorderAll />
                                        </span>
                                        <Link to="/dashboard" className="block">
                                            MyOrder
                                        </Link>
                                    </li>
                                    <li className="flex justify-start items-center gap-2 py-2 hover:bg-blue-100 rounded-lg">
                                        <span className="text-xl">
                                            <AiOutlineProfile />
                                        </span>
                                        <Link
                                            to="/dashboard/profile"
                                            className="block"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    {/* <li className="flex justify-start items-center gap-2 py-2 hover:bg-blue-100 rounded-lg">
                                        <span className="text-xl">
                                            <FaBorderAll />
                                        </span>
                                        <Link
                                            to="/dashboard/my-orders"
                                            className="block"
                                        >
                                            My Orders
                                        </Link>
                                    </li> */}
                                    <li className="flex justify-start items-center gap-2 py-2 hover:bg-blue-100 rounded-lg">
                                        <span className="text-xl">
                                            <FaHeart />
                                        </span>
                                        <Link
                                            to="/dashboard/my-wishlist"
                                            className="block"
                                        >
                                            Wishlist
                                        </Link>
                                    </li>
                                    <li className="flex justify-start items-center gap-2 py-2 hover:bg-blue-100 rounded-lg">
                                        <span className="text-xl">
                                            <IoChatboxEllipsesOutline />
                                        </span>
                                        <Link
                                            to="/dashboard/chat"
                                            className="block"
                                        >
                                            Chat
                                        </Link>
                                    </li>
                                    <li className="flex justify-start items-center gap-2 py-2 hover:bg-blue-100 rounded-lg">
                                        <span className="text-xl">
                                            <RiLockPasswordLine />
                                        </span>
                                        <Link
                                            to="/dashboard/change-password"
                                            className="block"
                                        >
                                            Change Password
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="w-[calc(100%-270px)] bg-white shadow-lg md-lg:w-full rounded-lg">
                                <div className="mx-4 md-lg:mx-0">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
