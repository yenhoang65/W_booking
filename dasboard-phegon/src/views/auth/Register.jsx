import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { FaParking } from "react-icons/fa";
// import Rectagele69 from"../../assets/image/Rectangle69.png";
import Api from "../../api/api";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        username: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber, username } = formData;
        if (!name || !email || !password || !phoneNumber || !username) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage("Please fill all the fields.");
            setTimeout(() => setErrorMessage(""), 5000);
            return;
        }
        try {
            const response = await Api.registerUser(formData);

            if (response.statusCode === 200) {
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                    username: "",
                });
                setSuccessMessage("User registered successfully");
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(""), 5000);
        }
    };

    const loader = true;

    return (
        <div className="min-w-screen  h-[800px] bg-[#FFF9E5]">
            <div className="flex justify-center pt-[0px] text-[40px] font-bold mb-8">
                <span className="flex">
                    <FaParking className="mt-[7px]" />
                    HEGON
                </span>
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="success-message">{successMessage}</p>
                )}
            </div>
            <div className="absolute border top-[70px] -translate-x-1/2 left-1/2 px-10 py-6 rounded-2xl bg-white inline-block w-[502px]">
                <span className="flex text-[30px]  font-bold mb-0">
                    Create your vendor account
                </span>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            onChange={handleInputChange}
                            value={formData.name}
                            required
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            className="border-black border-none border-b-2"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            onChange={handleInputChange}
                            value={formData.email}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="border-black border-none border-b-2"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            onChange={handleInputChange}
                            value={formData.username}
                            type="text"
                            name="username"
                            required
                            id="username"
                            placeholder="Username"
                            className="border-black border-none border-b-2"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            onChange={handleInputChange}
                            value={formData.password}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="border-black border-none border-b-2"
                        />
                    </div>

                    <div className="flex mt-7 items-center w-full gap-3 mb-3">
                        <input
                            type="checkbox"
                            name="checkbox"
                            id="checkbox"
                            className="w-5 h-5 text-blue overflow-hidden rounded border-gray-300 focus:ring-blue-500 bg-gray-100"
                        />
                        <label htmlFor="checkbox">
                            I agree to privacy policy
                        </label>
                    </div>

                    <button
                        disabled={loader ? true : false}
                        className="bg-primary w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                    >
                        {loader ? (
                            <PropagateLoader
                                color="#fff"
                                cssOverride={overrideStyle}
                            />
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                    <div className="flex items-center mt-5 gap-3 justify-center">
                        <p>
                            Already have an account?{" "}
                            <Link className="font-bold" to={"/login"}>
                                Sign In
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
                </form>
            </div>

            {/* <div className='relative bg-primary h-[60vh] rounded-custom '>
                <h1 className='flex pt-[20px] justify-center font-roboto-slab text-[5rem] font-bold text-white'>
                    TAGO.
                </h1>
                
            </div> */}
        </div>
    );
};

export default Register;
