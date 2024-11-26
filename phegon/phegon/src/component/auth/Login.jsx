import { Link, useNavigate } from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import image803 from "../../../public/image/image803.png";
import image804 from "../../../public/image/image804.png";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { HashLoader } from "react-spinners";
import { login, messageClear, googleLogin} from "../store/reducer/authReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoginSocialGoogle} from "reactjs-social-login";
import { GoogleLoginButton} from "react-social-login-buttons";


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



    // const handleGoogleLoginSuccess = (response) => {
    //     const tokenId = response.tokenId;
    //     dispatch(googleLogin(tokenId)); // Gọi action googleLogin
    // };
    //
    // const handleGoogleLoginFailure = (response) => {
    //     console.error("Login failed:", response);
    //     toast.error("Google login failed");
    // };
    const onLoginStart = useCallback(() => {
    }, []);

    const onLogoutFailure = useCallback(() => {
        alert("logout fail");
    }, []);

    const onLogoutSuccess = useCallback(() => {
        alert("logout success");
    }, []);


    // Google
    const onLoginSuccessGoogle = useCallback(({data }) => {
        console.log("data: ", data);
        const token = data.access_token;
        if (data) {
            dispatch(googleLogin(token));
        } else {
            console.log("Login failed. No access token received.");
        }
    },[])

    const handleGoogleReject = useCallback((err) => {
        console.log("Google login error: ", err);
    }, []);


    useEffect(() => {
        if (successMessage) {
            toast.success("Success");
            dispatch(messageClear());
            navigate("/");
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage]);

    return (

            <div className="flex justify-center items-center text-center">
                <div className="mt-[40px] border w-[400px]">
                    <div className="mt-[20px]">
                        <span className="text-[30px]">Login</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex p-[8px] border ml-[30px] mt-[30px] mr-[30px] rounded-full">
                            <img className="pl-[45px]" src={image803} alt="" />
                            <span className="ml-[10px] text-[17px]">
                                Continue with Facebook
                            </span>
                        </div>

                        <div className="p-[8px] border ml-[30px] mt-[10px] mr-[30px] ">
                            <LoginSocialGoogle className={"social-container"}
                                               client_id="1058082993437-6iqr2cmlkkhet731flq206f12st8s7to.apps.googleusercontent.com"
                                               onLogoutFailure={onLogoutFailure}
                                               onLoginStart={onLoginStart}
                                               onLogoutSuccess={onLogoutSuccess}
                                               onResolve={onLoginSuccessGoogle}
                                               onReject={handleGoogleReject}
                                               scope="openid profile email"
                            >
                                <GoogleLoginButton
                                    style={{width: "100%", height: "45px",borderRadius:"20px"}}
                                    text={" Continue with Google"}/>
                            </LoginSocialGoogle>

                        </div>

                        <div className="flex p-[8px] border ml-[30px] mt-[10px] mr-[30px] rounded-full">
                            <img className="pl-[45px]" src={image804} alt="" />
                            {/* <FaGithub /> */}
                            <span className="ml-[10px] text-[17px]">
                                Continue with Github
                            </span>
                        </div>

                        <div className="mt-[15px]">
                            <span>OR</span>
                        </div>

                        <div className="flex p-[8px] border ml-[30px] mt-[10px] mr-[30px] rounded-full">
                            <FaRegUserCircle className="ml-[5px] mt-[4px]" />
                            <input
                                className="ml-[10px] w-[275px] outline-none"
                                onChange={inputHandle}
                                value={state.username}
                                required
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                            />
                        </div>

                        <div className="flex p-[8px] border ml-[30px] mt-[10px] mr-[30px] rounded-full">
                            <RiLockPasswordLine className="ml-[5px] mt-[4px]" />
                            <input
                                className="ml-[10px] w-[275px] outline-none"
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                onChange={inputHandle}
                                value={state.password}
                                required
                            />
                        </div>

                        <Link className="ml-[200px]" to="">
                            Forgot password?
                        </Link>

                        <div className="p-[8px] border ml-[30px] mt-[3px] mr-[30px] rounded-full bg-[#FF5B26] cursor-pointer">
                            <button
                                disabled={loader ? true : false}
                                type="submit"
                                className="w-[280px] text-[17px] font-[600] text-[#FFF]"
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
                        </div>
                    </form>

                    <div className="mt-[7px] pb-[30px]">
                        <span>
                            Don’t a have account?{" "}
                            <Link className="font-bold" to="/register">
                                Register
                            </Link>
                        </span>
                    </div>
                </div>
            </div>

    );
};

export default Login;
