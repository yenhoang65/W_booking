import { FadeLoader, PropagateLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaImages } from "react-icons/fa";
import {
    getMyInfo,
    messageClear,
    updateInfo,
} from "../../../store/reducer/authReducer";
import toast from "react-hot-toast";

const AdminProfile = () => {
    const { userInfo, loader, token, successMessage } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: "",
        email: "",
        photo: "",
        phoneNumber: "",
        address: "",
        shopName: "",
    });
    const [imageShow, setImageShow] = useState("");

    const handleState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const imageHandle = (e) => {
        let files = e.target.files;
        if (files.length > 0) {
            setImageShow(URL.createObjectURL(files[0]));
            setState({
                ...state,
                photo: files[0],
            });
        }
    };

    useEffect(() => {
        if (userInfo) {
            setState({
                name: userInfo?.name || "",
                email: userInfo?.email || "",
                username: userInfo?.username || "",
                phoneNumber: userInfo?.phoneNumber || "",
                shopName: userInfo?.shopName || "",
            });
            setImageShow(userInfo.photo);
        }
    }, [userInfo]);

    const submit_request = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", state.name);
        formData.append("email", state.email);
        formData.append("phone", state.phoneNumber);
        formData.append("username", state.username);
        formData.append("photo", state.photo);

        dispatch(updateInfo({ userId: userInfo.id, formData, token }));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            dispatch(getMyInfo());
        }
    }, [successMessage]);

    return (
        <section className="px-2 lg:px-7 pt-5">
            <div className="bg-primary p-5 rounded-md text-white flex flex-col justify-center ">
                <span className="font-bold text-[20px]">Update Profile</span>
                <form onSubmit={submit_request}>
                    <div className="grid grid-cols-2 gap-10 mt-8 text-black">
                        <div className=" px-4 py-2">
                            <div className="flex justify-center items-center py-3">
                                {imageShow ? (
                                    <label
                                        htmlFor="photo"
                                        className="h-[200px] w-[200px] object-cover rounded-md relative p-3 cursor-pointer overflow-hidden"
                                    >
                                        <img
                                            className="absolute top-0 left-0 w-full h-full object-cover"
                                            src={imageShow}
                                            alt=""
                                        />
                                        {loader && (
                                            <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                                <span>
                                                    <FadeLoader />
                                                </span>
                                            </div>
                                        )}
                                    </label>
                                ) : (
                                    <label
                                        className="flex justify-center items-center flex-col h-[250px] w-[400px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                                        htmlFor="photo"
                                    >
                                        <span>
                                            <FaImages />
                                        </span>
                                        <span>Select Image</span>
                                        {loader && (
                                            <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                                <span>
                                                    <FadeLoader />
                                                </span>
                                            </div>
                                        )}
                                    </label>
                                )}
                                <input
                                    onChange={imageHandle}
                                    type="file"
                                    className="hidden"
                                    id="photo"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-2 gap-[20px]">
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label className="font-bold" htmlFor="name">
                                        Name:
                                    </label>
                                    <input
                                        value={state.name}
                                        onChange={handleState}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder=" Name"
                                    />
                                </div>
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label
                                        className="font-bold"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        value={state.email}
                                        onChange={handleState}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-[20px]">
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label
                                        className="font-bold"
                                        htmlFor="phone"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        value={state.phoneNumber}
                                        onChange={handleState}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="Phone"
                                    />
                                    {/* {errors.phone && (
                                        <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                            <BiSolidError /> {errors.phone}
                                        </span>
                                    )} */}
                                </div>

                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label
                                        className="font-bold"
                                        htmlFor="username"
                                    >
                                        UserName
                                    </label>
                                    <input
                                        value={state.username}
                                        onChange={handleState}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="UserName"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label className="font-bold" htmlFor="address">
                                    Password
                                </label>
                                <input
                                    value={state.shopName}
                                    onChange={handleState}
                                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                    type="password"
                                    id="shopName"
                                    name="shopName"
                                    placeholder="Password"
                                />
                                {/* {errors.shopName && (
                                    <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                        <BiSolidError /> {errors.shopName}
                                    </span>
                                )} */}
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-4 justify-center items-center ">
                        <button
                            disabled={loader ? true : false}
                            type="submit"
                            className=" text-white cursor-pointer items-center gap-2 font-bold border-[3px] px-8 rounded-full rounded-tl-3xl py-1 bg-[#ed6436] hover:bg-white hover:border-[2px] hover:text-black"
                        >
                            {loader ? (
                                <PropagateLoader
                                    color="#fff"
                                    // cssOverride={overrideStyle}
                                />
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AdminProfile;
