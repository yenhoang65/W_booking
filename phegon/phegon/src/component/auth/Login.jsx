import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { HashLoader } from "react-spinners";
import { login, messageClear, googleLogin } from "../store/reducer/authReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import {
    FacebookLoginButton,
    GoogleLoginButton,
} from "react-social-login-buttons";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loader, successMessage, errorMessage } = useSelector(
        (state) => state.auth
    );

    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(state));
    };

    const onLoginStart = useCallback(() => {}, []);

    const onLogoutFailure = useCallback(() => {
        alert("Logout failed");
    }, []);

    const onLogoutSuccess = useCallback(() => {
        alert("Logout successful");
    }, []);

    const onLoginSuccessGoogle = useCallback(
        ({ data }) => {
            const token = data.access_token;
            if (data) {
                dispatch(googleLogin(token));
            } else {
                console.error("Login failed. No access token received.");
            }
        },
        [dispatch]
    );

    const handleGoogleReject = useCallback((err) => {
        console.error("Google login error: ", err);
    }, []);

    useEffect(() => {
        if (successMessage) {
            toast.success("Login successful!");
            dispatch(messageClear());
            localStorage.setItem("username", state.username);
            navigate("/");
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch, navigate]);

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Login Form */}
            <div className="w-1/2 flex justify-center items-center bg-white p-8">
                <div className="w-[500px]">
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back!
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Sign in to continue your journey
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <LoginSocialGoogle
                                client_id="1058082993437-6iqr2cmlkkhet731flq206f12st8s7to.apps.googleusercontent.com"
                                onLogoutFailure={onLogoutFailure}
                                onLoginStart={onLoginStart}
                                onLogoutSuccess={onLogoutSuccess}
                                onResolve={onLoginSuccessGoogle}
                                onReject={handleGoogleReject}
                                scope="openid profile email"
                            >
                                <GoogleLoginButton
                                    style={{
                                        width: "100%",
                                        height: "50px",
                                        borderRadius: "25px",
                                        paddingLeft: "45px",
                                        background:
                                            "linear-gradient(to right, #4285F4, #34A853)",
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        textAlign: "center",
                                        boxShadow:
                                            "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                    text="Continue with Google"
                                />
                            </LoginSocialGoogle>

                            <LoginSocialFacebook
                                client_id="your-facebook-app-client-id"
                                onLogoutFailure={onLogoutFailure}
                                onLoginStart={onLoginStart}
                                onLogoutSuccess={onLogoutSuccess}
                                onResolve={(data) =>
                                    console.log(
                                        "Facebook Login Success: ",
                                        data
                                    )
                                }
                                onReject={(err) =>
                                    console.error("Facebook Login Error: ", err)
                                }
                            >
                                <FacebookLoginButton
                                    style={{
                                        width: "100%",
                                        height: "50px",
                                        borderRadius: "25px",
                                        paddingLeft: "45px",
                                        background:
                                            "linear-gradient(to right, #3b5998, #8b9dc3)",
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        textAlign: "center",
                                        boxShadow:
                                            "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                    text="Continue with Facebook"
                                />
                            </LoginSocialFacebook>
                        </div>

                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-4 text-gray-500 text-sm font-medium">
                                OR
                            </span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center p-3 border border-gray-200 hover:border-blue-400 rounded-full bg-white shadow-sm focus-within:shadow-md transition-all duration-200">
                                <FaRegUserCircle className="ml-4 text-gray-400 text-xl" />
                                <input
                                    className="ml-3 w-full outline-none text-gray-700"
                                    onChange={inputHandle}
                                    value={state.username}
                                    required
                                    type="text"
                                    name="username"
                                    placeholder="Username & Email"
                                />
                            </div>

                            <div className="flex items-center p-3 border border-gray-200 hover:border-blue-400 rounded-full bg-white shadow-sm focus-within:shadow-md transition-all duration-200">
                                <RiLockPasswordLine className="ml-4 text-gray-400 text-xl" />
                                <input
                                    className="ml-3 w-full outline-none text-gray-700"
                                    onChange={inputHandle}
                                    value={state.password}
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="text-right">
                            <Link
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                to="/resetPassword"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="mt-6">
                            <button
                                disabled={loader}
                                type="submit"
                                className="w-full p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transform hover:translate-y-[-1px] transition-all duration-200"
                            >
                                {loader ? (
                                    <HashLoader
                                        color="#fff"
                                        size={18}
                                        speedMultiplier={1}
                                    />
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-gray-600">
                        <span>
                            Don't have an account?{" "}
                            <Link
                                className="font-semibold text-blue-600 hover:text-blue-700"
                                to="/register"
                            >
                                Register
                            </Link>
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Side - Image and Content */}
            <div className="w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white p-8">
                <div className="max-w-md text-center">
                    <div className="flex">
                        <h1 className="text-4xl font-bold mb-6 flex mt-5">
                            Welcome to{" "}
                        </h1>
                        <div className="flex items-center space-x-3 ml-5">
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
                    </div>
                    <p className="text-lg mb-8">
                        Your trusted companion for discovering amazing
                        destinations and planning unforgettable journeys.
                    </p>
                    <ul className="space-y-4 text-left list-none">
                        <li className="flex items-center">
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Discover unique destinations
                        </li>
                        <li className="flex items-center">
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Get personalized travel recommendations
                        </li>
                        <li className="flex items-center">
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Access exclusive travel deals
                        </li>
                        <li className="flex items-center">
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Connect with fellow travelers
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Login;
