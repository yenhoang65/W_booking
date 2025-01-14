import Booking from "../../views/vendor/Booking";
import Dashboard from "../../views/vendor/Dashboard";
import Hotel from "../../views/vendor/Hotel";
import Room from "../../views/vendor/Room";
import VendorProfile from "../../views/vendor/VendorProfile";

export const vendorRoutes = [
    {
        path: "/vendor/dashboard",
        element: <Dashboard />,
        role: "VENDOR",
        status: "active",
    },
    {
        path: "/vendor/hotel",
        element: <Hotel />,
        role: "VENDOR",
        status: "active",
    },
    {
        path: "/vendor/hotel/:hotelId",
        element: <Hotel />,
        role: "VENDOR",
        status: "active",
    },
    {
        path: "/vendor/room",
        element: <Room />,
        role: "VENDOR",
        status: "active",
    },
    {
        path: "/vendor/room/:roomId",
        element: <Room />,
        role: "VENDOR",
        status: "active",
    },
    {
        path: "/vendor/booking",
        element: <Booking />,
        role: "VENDOR",
        status: "active",
    },
    {
        path: "/vendor/booking/:bookingId",
        element: <Booking />,
        role: "VENDOR",
        status: "active",
    },
    {
        path: "/vendor/profile",
        element: <VendorProfile />,
        role: "VENDOR",
        status: "active",
    },
];
