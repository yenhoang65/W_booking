import { AiOutlineDashboard } from "react-icons/ai";
import { FaHotel } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
export const allNav = [
    {
        id: 1,
        title: "Dashboard",
        icon: <AiOutlineDashboard />,
        role: "ADMIN",
        path: "/admin/dashboard",
    },
    {
        id: 2,
        title: "User",
        icon: <AiOutlineDashboard />,
        role: "ADMIN",
        path: "/admin/user",
    },

    {
        id: 3,
        title: "Dashboard",
        icon: <AiOutlineDashboard />,
        role: "VENDOR",
        path: "/vendor/dashboard",
    },
    {
        id: 4,
        title: "Hotel",
        icon: <FaHotel />,
        role: "VENDOR",
        path: "/vendor/hotel",
    },
    {
        id: 5,
        title: "Room",
        icon: <MdBedroomParent />,
        role: "VENDOR",
        path: "/vendor/room",
    },

    {
        id: 6,
        title: "Profile",
        icon: <AiOutlineDashboard />,
        role: "ADMIN",
        path: "/admin/profile",
    },

    {
        id: 7,
        title: "Booking",
        icon: <TbBrandBooking />,
        role: "VENDOR",
        path: "/vendor/booking",
    },

    {
        id: 8,
        title: "Profile",
        icon: <RiProfileLine />,
        role: "VENDOR",
        path: "/vendor/profile",
    },

    {
        id: 9,
        title: "Contact",
        icon: <RiProfileLine />,
        role: "ADMIN",
        path: "/admin/contact",
    },
];
