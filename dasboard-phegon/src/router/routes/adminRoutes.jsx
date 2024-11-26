import AdminContact from "../../views/admin/contact/AdminContact";
import AdminProfile from "../../views/admin/profile/AdminProfile";

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        element: "Admin dashboard",
        role: "ADMIN",
    },
    {
        path: "/admin/user",
        element: "User",
        role: "ADMIN",
    },
    {
        path: "/admin/profile",
        element: <AdminProfile />,
        role: "ADMIN",
    },
    {
        path: "/admin/contact",
        element: <AdminContact />,
        role: "ADMIN",
    },
];
