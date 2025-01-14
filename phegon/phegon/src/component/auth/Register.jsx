import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { messageClear, register } from "../store/reducer/authReducer";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loader, successMessage } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        phoneNumber: "",
        email: "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success("Success");
            dispatch(messageClear());
            navigate("/login");
        }
    }, [successMessage]);

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Banner */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 p-12 flex-col justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span
                            className="text-3xl font-bold text-blue-600 cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            P
                        </span>
                    </div>
                    <span
                        className="text-white text-2xl cursor-pointer font-bold"
                        onClick={() => navigate("/")}
                    >
                        hegon
                    </span>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-white leading-tight">
                        Discover Amazing Places <br />
                        With PhuotLove
                    </h1>
                    <p className="text-white/80 text-lg">
                        Join our community of travelers and explorers. Share
                        experiences, find new destinations, and make memories
                        that last forever.
                    </p>
                    <div className="flex space-x-4">
                        <div className="bg-white/10 p-4 rounded-lg">
                            <h3 className="text-white font-bold text-xl">
                                10K+
                            </h3>
                            <p className="text-white/70">Active Users</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                            <h3 className="text-white font-bold text-xl">
                                500+
                            </h3>
                            <p className="text-white/70">Destinations</p>
                        </div>
                    </div>
                </div>

                <div className="text-white/60 text-sm">
                    © 2024 PhuotLove. All rights reserved.
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Join us and start your journey today!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex items-center p-3 border border-gray-200 hover:border-blue-400 rounded-full bg-white shadow-sm focus-within:shadow-md transition-all duration-200">
                            <FaRegUserCircle className="ml-3 text-gray-400 text-xl" />
                            <input
                                className="ml-3 w-full outline-none text-gray-700"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                type="text"
                                required
                                placeholder="Username"
                            />
                        </div>

                        <div className="flex items-center p-3 border border-gray-200 hover:border-blue-400 rounded-full bg-white shadow-sm focus-within:shadow-md transition-all duration-200">
                            <RiLockPasswordLine className="ml-3 text-gray-400 text-xl" />
                            <input
                                className="ml-3 w-full  outline-none text-gray-700"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                type="password"
                                required
                                placeholder="Password"
                            />
                        </div>

                        <div className="flex items-center p-3 border border-gray-200 hover:border-blue-400 rounded-full bg-white shadow-sm focus-within:shadow-md transition-all duration-200">
                            <MdDriveFileRenameOutline className="ml-3 text-gray-400 text-xl" />
                            <input
                                className="ml-3 w-full outline-none text-gray-700"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                type="text"
                                required
                                placeholder="Full Name"
                            />
                        </div>

                        <div className="flex items-center p-3 border border-gray-200 hover:border-blue-400 rounded-full bg-white shadow-sm focus-within:shadow-md transition-all duration-200">
                            <IoIosPhonePortrait className="ml-3 text-gray-400 text-xl" />
                            <input
                                className="ml-3 w-full outline-none text-gray-700"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                type="text"
                                required
                                placeholder="Phone Number"
                            />
                        </div>

                        <div className="flex items-center p-3 border border-gray-200 hover:border-blue-400 rounded-full bg-white shadow-sm focus-within:shadow-md transition-all duration-200">
                            <MdOutlineEmail className="ml-3 text-gray-400 text-xl" />
                            <input
                                className="ml-3 w-full outline-none text-gray-700"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder="Email Address"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transform hover:translate-y-[-1px] transition-all duration-200"
                            disabled={loader}
                        >
                            {loader ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="text-center text-gray-600">
                        <span>
                            Already have an account?{" "}
                            <Link
                                className="font-semibold text-blue-600 hover:text-blue-700"
                                to="/login"
                            >
                                Sign in
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
