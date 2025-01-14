import DatePicker from "react-datepicker";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "../../common/footer";
// import img from "../../../../public/image/Rectangle69.png";
import { CiUser } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

import { LuHotel } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomById } from "../../store/reducer/roomReducer";
import { resetBookingState } from "../../store/reducer/bookingReducer";
import toast from "react-hot-toast";
import { ApiPayment } from "../../store/ApiPayment.jsx";
import Header from "../../common/header.jsx";

const Checkout = () => {
    const dispatch = useDispatch();
    const { room } = useSelector((state) => state.room);
    const { userInfo, successMessage, errorMessage } = useSelector(
        (state) => state.auth
    );

    const [numOfAdults, setNumOfAdults] = useState(1);
    const [numOfChildren, setNumOfChildren] = useState(0);
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(room?.roomPrice || 0);

    const {
        state: { roomId },
    } = useLocation();

    const calculateDays = (checkInDate, checkOutDate) => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const differenceInTime = checkOut - checkIn;
        const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Tính số ngày
        return differenceInDays > 0 ? differenceInDays : 0; // Đảm bảo không có số âm
    };

    const calculateTotalPrice = (roomPrice, checkInDate, checkOutDate) => {
        const numberOfDays = calculateDays(checkInDate, checkOutDate);
        return numberOfDays * roomPrice;
    };

    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const newTotalPrice = calculateTotalPrice(
                room?.roomPrice,
                checkInDate,
                checkOutDate
            );
            setTotalPrice(newTotalPrice);
        }
    }, [checkInDate, checkOutDate, room?.roomPrice]);

    useEffect(() => {
        dispatch(getRoomById(roomId));
    }, [roomId]);

    const submit_booking = () => {
        // Function to format Date to yyyy-dd-MM
        const formatDate = (date) => {
            const year = date.getFullYear();
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            return `${year}-${day}-${month}`;
        };

        const totalPrice = calculateTotalPrice(
            room.roomPrice,
            checkInDate,
            checkOutDate
        );

        const formattedCheckInDate = checkInDate
            ? formatDate(checkInDate)
            : null;
        const formattedCheckOutDate = checkOutDate
            ? formatDate(checkOutDate)
            : null;

        const request = {
            vnpAmmount: totalPrice,
            userId: userInfo.id,
            roomId: room.id,
            hotelId: room.hotel.id,
            bookingRequest: {
                formattedCheckInDate,
                formattedCheckOutDate,
                numOfAdults,
                numOfChildren,
            },
        };
        ApiPayment.paymentVNPAY(request)
            .then((response) => {
                // toast.success("Thanh toán thành công!");
                window.location.replace(response.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetBookingState());
            setNumOfAdults(1);
            setNumOfChildren(0);
            setCheckInDate("");
            setCheckOutDate("");
            // dispatch(getHotelAll());
            // navigate("/vendor/hotel");
            // setOpenForm(false);
        }
        if (errorMessage) {
            toast.success(errorMessage);
        }
    }, [successMessage, errorMessage]);

    //profile

    const [state, setState] = useState({
        name: "",
        email: "",
        photo: "",
        phoneNumber: "",
        address: "",
        shopName: "",
    });

    const handleState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (userInfo) {
            setState({
                name: userInfo.name || "",
                email: userInfo.email || "",
                username: userInfo.username || "",
                phoneNumber: userInfo.phoneNumber || "",
                shopName: userInfo.shopName || "",
            });
        }
    }, [userInfo]);

    return (
        <>
            <section>
                <Header />
                <div className="w-[1060px] m-auto pb-10">
                    <div className="pt-5 pb-5 flex">
                        <div className="border h-[30px]  w-[30px] bg-[#006ce4] rounded-full py-[5px]">
                            <IoIosArrowDown className="ml-[4px] text-[20px] text-[#fff]" />
                        </div>
                        <div className="mt-1">
                            <h3 className=" ml-2 font-[600] pr-3">
                                You choose{" "}
                            </h3>
                        </div>
                        <div className="border-t border-1 border-[#333] mt-4 w-[250px]"></div>
                        <div className="border h-[30px] ml-3 w-[30px] bg-[#006ce4] text-center text-[18px] text-[#FFF] rounded-full">
                            2
                        </div>
                        <div className="mt-1">
                            <h3 className=" ml-2 font-[600] pr-3">
                                Confirm information
                            </h3>
                        </div>
                        <div className="border-t border-1 border-[#333] mt-4 w-[200px]"></div>
                        <div className="border h-[26px] ml-3 w-[26px] font-mono border-[#333] text-center text-[18px] text-[#555] rounded-full">
                            3
                        </div>
                        <div className="mt-1">
                            <h3 className=" ml-2 font-[600] text-[#555]">
                                Booking confirmation
                            </h3>
                        </div>
                    </div>
                    <div className=" gap-10 flex">
                        <div>
                            <div>
                                <div className=" border border-[#bad4f7] h-[340px] w-[350px]">
                                    <div className="border-b border-[#bad4f7] bg-[#ebf3ff] p-2">
                                        <h4 className="ml-3 font-[600]">
                                            Reservation details
                                        </h4>
                                    </div>

                                    <div className=" mt-2 ml-2">
                                        <h4 className="ml-3 font-[500]">
                                            Check In Date:
                                        </h4>
                                        <DatePicker
                                            type="date"
                                            selected={checkInDate}
                                            onChange={(date) =>
                                                setCheckInDate(date)
                                            }
                                            required
                                            className="outline-none ml-2 px-3 py-1 border border-[#333] placeholder:text-[#333] w-[314px] cursor-pointer rounded-full placeholder:text-[14px]"
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Select Check-in Date"
                                        />
                                    </div>
                                    <div className=" mt-3 ml-2">
                                        <h4 className="ml-3 font-[500]">
                                            Check Out Date:
                                        </h4>
                                        <DatePicker
                                            type="date"
                                            selected={checkOutDate}
                                            onChange={(date) =>
                                                setCheckOutDate(date)
                                            }
                                            required
                                            className="outline-none ml-2 px-3 py-1 border border-[#333] placeholder:text-[#333] w-[314px] cursor-pointer rounded-full placeholder:text-[14px]"
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Select Check-in Date"
                                        />
                                    </div>
                                    <div className=" mt-3 ml-2">
                                        <h4 className="ml-3 font-[500]">
                                            NumOfAdults:
                                        </h4>
                                        <input
                                            className="placeholder:text-[14px] pl-[10px] pr-[20px] ml-2 w-[314px] rounded-full h-8 border border-[#333] placeholder:text-[#333] outline-none"
                                            type="number"
                                            value={numOfAdults}
                                            onChange={(e) =>
                                                setNumOfAdults(e.target.value)
                                            }
                                            placeholder="NumOfAdults"
                                        />
                                    </div>
                                    <div className=" mt-3 ml-2">
                                        <h4 className="ml-3 font-[500]">
                                            NumOfChildren:
                                        </h4>
                                        <input
                                            type="number"
                                            value={numOfChildren}
                                            onChange={(e) =>
                                                setNumOfChildren(e.target.value)
                                            }
                                            className="placeholder:text-[14px] pl-[10px] pr-[20px] ml-2 w-[314px] rounded-full h-8 border border-[#333] placeholder:text-[#333] outline-none"
                                            placeholder="NumOfChildren"
                                        />
                                    </div>
                                    {/* <button
                                        type="submit"
                                        className="bg-[#FF5B26] hover:border-[2px] font-[600] hover:bg-white hover:text-black text-[#FFF] py-2 px-4 rounded-full rounded-tl-3xl"
                                    >
                                        Confirmation
                                    </button> */}
                                </div>
                            </div>
                            <div className="flex justify-between mt-6  bg-[#ebf3ff] border border-[#bad4f7]  w-[350px]">
                                <h4 className="pl-5 font-[600] py-3">Price:</h4>
                                <h4 className="pr-5 font-[600] py-3 font-sans">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(
                                        checkInDate && checkOutDate
                                            ? totalPrice
                                            : room?.roomPrice
                                    )}
                                </h4>
                            </div>
                            <div className=" border border-[#bad4f7] mt-6 h-[230px] w-[350px]">
                                <div className="border-b border-[#bad4f7] bg-[#ebf3ff] p-2">
                                    <h4 className="ml-3 font-[600]">
                                        Review booking conditions
                                    </h4>
                                </div>
                                <div className=" mt-3 ml-2">
                                    <h4 className="ml-3 font-[500]">
                                        Incentives from Partners
                                    </h4>
                                    <div className="flex mt-3 ml-2">
                                        <GoDotFill className="mt-1" />
                                        <h4 className="ml-2">
                                            Youll pay securely today with
                                            Booking.com
                                        </h4>
                                    </div>
                                    <div className="flex mt-3 ml-2">
                                        <GoDotFill className="mt-1" />
                                        <h4 className="ml-2">
                                            Changes to personal information or
                                            booking
                                        </h4>
                                    </div>
                                    <div className="flex mt-3 ml-2">
                                        <GoDotFill className="mt-1" />
                                        <h4 className="ml-2">
                                            Our partner company will be the
                                            invoice issuer
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="  w-full">
                            {room ? (
                                <div className="flex">
                                    <div className="h-[250px] w-[270px]">
                                        <img
                                            className="h-[250px] w-[270px]"
                                            src={room?.roomPhotoUrl}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-7 w-[370px]">
                                        <h4 className="font-[600] text-[25px]">
                                            {/* Aria Grand Hotel & Spa */}
                                            {room?.roomType}
                                        </h4>
                                        <div className="flex text-[25px] text-[#ffd670] gap-1 mt-1">
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                        </div>
                                        <div className="flex mt-4 ">
                                            <LuHotel className="text-[30px]" />
                                            <h4 className="ml-1 font-sans text-[18px]">
                                                {/* 63-65-67 Phan Ton St, My An
                                                Ward, Ngu Hanh Son District,, Đà
                                                Nẵng, Việt Nam */}
                                                {room?.hotel?.name}
                                            </h4>
                                        </div>
                                        <div className="flex mt-4 ">
                                            <MdOutlineLocationOn className="text-[30px]" />
                                            <h4 className="ml-1 font-sans text-[18px]">
                                                {/* 63-65-67 Phan Ton St, My An
                                                Ward, Ngu Hanh Son District,, Đà
                                                Nẵng, Việt Nam */}
                                                {room?.hotel?.address}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>No room selected for booking</p>
                            )}

                            <div className="border border-[#ced4da] mt-8 h-[50px] w-[650px] rounded-lg">
                                <h4 className="text-[20px] flex">
                                    <CiUser className="ml-3 mt-3 text-[#0096c7]" />
                                    <h3 className="text-[17px] font-sans mt-[10px] ml-2">
                                        <Link to="" className="text-[#0096c7]">
                                            Sign-in{" "}
                                        </Link>
                                        to make a reservation with your saved
                                        information Friend
                                    </h3>
                                </h4>
                            </div>

                            <div className="border bg-[#ebf3ff]  border-[#ced4da] mt-8  w-[650px] rounded-lg">
                                <h3 className="mt-5 ml-5">
                                    Almost done! Just complete the information
                                    <strong className="text-blue-600">
                                        (required)
                                    </strong>
                                </h3>
                                <form>
                                    <div className="grid grid-cols-2 gap-[20px] mt-5">
                                        <div className="flex flex-col w-full gap-1 mb-3 ml-5">
                                            <label
                                                className="font-semibold"
                                                htmlFor="name"
                                            >
                                                Name:
                                            </label>
                                            <input
                                                value={state.name}
                                                onChange={handleState}
                                                className="px-4 py-2 focus:border-indigo-500 w-[290px] outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder=" Name"
                                            />
                                        </div>
                                        <div className="flex flex-col w-full gap-1 mb-3">
                                            <label
                                                className="font-semibold"
                                                htmlFor="email"
                                            >
                                                Email
                                            </label>
                                            <input
                                                value={state.email}
                                                onChange={handleState}
                                                className="px-4 py-2 focus:border-indigo-500  w-[290px] outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                                type="text"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-[20px] ">
                                        <div className="flex flex-col w-full gap-1 mb-3 ml-5">
                                            <label
                                                className="font-semibold"
                                                htmlFor="Phone"
                                            >
                                                Phone:
                                            </label>
                                            <input
                                                value={state.phoneNumber}
                                                onChange={handleState}
                                                className="px-4 py-2 focus:border-indigo-500 w-[290px] outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                placeholder=" Phone"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-6 ml-[500px]">
                                <button
                                    onClick={submit_booking}
                                    className="bg-[#006ce4] hover:border-[2px] font-[600] hover:bg-white hover:text-black text-[#FFF] py-2 px-4 rounded-full rounded-tl-3xl"
                                >
                                    Confirmation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Checkout;
