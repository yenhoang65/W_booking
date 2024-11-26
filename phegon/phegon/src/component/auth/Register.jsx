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
        dispatch(register(formData)); // Dispatch action register
    };

    useEffect(() => {
        if (successMessage) {
            toast.success("Success");
            dispatch(messageClear());
            navigate("/login");
        }
    }, [successMessage]);
    return (
        <div className="flex justify-center items-center text-center">
            <div className="mt-[40px] border w-[400px]">
                <div className="mt-[20px]">
                    <span className="text-[30px]">Register</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex p-[8px] border ml-[30px] mt-[10px] mr-[30px] rounded-full">
                        <FaRegUserCircle className="ml-[5px] mt-[4px]" />
                        <input
                            className="ml-[10px] w-[275px] outline-none"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            type="text"
                            required
                            placeholder="Username"
                        />
                    </div>

                    <div className="flex p-[8px] border ml-[30px] mt-[10px] mr-[30px] rounded-full">
                        <RiLockPasswordLine className="ml-[5px] mt-[4px]" />
                        <input
                            className="ml-[10px] w-[275px] outline-none"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex p-[8px] border ml-[30px] mt-[10px] mr-[30px] rounded-full">
                        <MdDriveFileRenameOutline className="ml-[5px] mt-[4px]" />
                        <input
                            className="ml-[10px] w-[275px] outline-none"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            type="text"
                            placeholder="Name"
                        />
                    </div>

                    <div className="flex p-[8px] border ml-[30px] mt-[10px] mr-[30px] rounded-full">
                        <IoIosPhonePortrait className="ml-[5px] mt-[4px]" />
                        <input
                            className="ml-[10px] w-[275px] outline-none"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                            type="text"
                            placeholder="Phone"
                        />
                    </div>

                    <div className="flex p-[8px] border ml-[30px] mt-[10px] mr-[30px] rounded-full">
                        <MdOutlineEmail className="ml-[5px] mt-[4px]" />
                        <input
                            className="ml-[10px] w-[275px] outline-none"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email"
                            placeholder="Email"
                        />
                    </div>

                    {/* <Link className='ml-[200px]' to="">Forgot password?</Link> */}

                    <div className="p-[8px] border ml-[30px] mt-[10px] mr-[30px] rounded-full bg-[#FF5B26] cursor-pointer">
                        <button
                            type="submit"
                            className="w-[280px] text-[17px] font-[600] text-[#FFF]"
                            disabled={loader}
                        >
                            {loader ? "Loading..." : "Register"}
                        </button>
                    </div>
                </form>

                <div className="mt-[7px] pb-[30px]">
                    <span>
                        Have a account?{" "}
                        <Link className="font-bold" to="/login">
                            Login
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;
