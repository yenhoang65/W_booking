import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { FaParking } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    googleLogin,
    login,
    messageClear,
} from "../../store/reducer/authReducer";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
    const dispatch = useDispatch();
    const { loader, successMessage } = useSelector((state) => state.auth);

    const navigate = useNavigate();

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

    const handleGoogleLoginSuccess = (response) => {
        const tokenId = response.tokenId;
        dispatch(googleLogin(tokenId)); // Gọi action googleLogin
    };

    const handleGoogleLoginFailure = (response) => {
        console.error("Login failed:", response);
        toast.error("Google login failed");
    };

    useEffect(() => {
        if (successMessage) {
            toast.success("Success");
            dispatch(messageClear());
            navigate("/");
        }
    }, [successMessage]);

    return (
        <div className="min-w-screen min-h-screen bg-[#FFF9E5]">
            <div className="flex justify-center pt-[20px] text-[40px] font-bold mb-8">
                <span className="flex">
                    <FaParking className="mt-[7px]" />
                    HEGON
                </span>
            </div>

            <div className="absolute top-[100px] border -translate-x-1/2 left-1/2 p-12 rounded-2xl bg-white inline-block w-[500px]">
                <span className="flex justify-center text-[2rem] font-bold mb-8">
                    Admin | Login
                </span>
                {/* {error && <p className="error-message">{error}</p>} */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            onChange={inputHandle}
                            value={state.username}
                            required
                            type="username"
                            name="username"
                            id="username"
                            placeholder="Username"
                            className="border-black border-none border-b-2"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            onChange={inputHandle}
                            value={state.password}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="border-black border-none border-b-2"
                        />
                    </div>

                    <button
                        disabled={loader ? true : false}
                        type="submit"
                        className="mt-14 bg-primary w-[100%] text-white font-semibold p-3"
                    >
                        {loader ? (
                            <HashLoader
                                color="#fff" // Màu của vòng tải
                                size={18} // Kích thước của vòng tải (pixel)
                                speedMultiplier={1} // Tốc độ quay
                            />
                        ) : (
                            "Login"
                        )}
                    </button>

                    <div className="flex items-center mt-5 gap-3 justify-center">
                        <p>
                            Don&apos;t have an account?{" "}
                            <Link className="font-bold" to={"/register"}>
                                Register
                            </Link>
                        </p>
                    </div>
                    <div className="w-full flex justify-center items-center mt-3">
                        <div className="w-[45%] bg-slate-700 h-[1px]"></div>
                        <div className="w-[10%] flex justify-center items-center ">
                            <span className="pb-1">Or</span>
                        </div>
                        <div className="w-[45%] bg-slate-700 h-[1px]"></div>
                    </div>
                    <div className="flex justify-center mt-5 items-center gap-3">
                        <div className="w-[135px] h-[25px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                            <span>
                                <FaGoogle />
                            </span>
                        </div>
                        <div className="w-[135px] h-[25px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden">
                            <span>
                                <FaFacebookF />
                            </span>
                        </div>
                    </div>

                    {/* Google Login Button */}
                </form>
            </div>
        </div>
    );
};

export default Login;
