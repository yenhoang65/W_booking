import { FaImage, FaPlusCircle } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import Search from "../components/Search";
import { RingLoader } from "react-spinners";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllBooking,
    getBookingDetail,
} from "../../store/reducer/bookingReducer";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ModalBookingDetail from "../components/ModalBookingDetail";
import { formatPrice } from "../../utils/utils";

function Booking() {
    const dispatch = useDispatch();
    const { bookings, booking } = useSelector((state) => state.booking);

    // const navigate = useNavigate();
    const [openForm, setOpenForm] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [parPage, setParPage] = useState(5);
    const [searchValue, setSearchValue] = useState("");
    const [show, setShow] = useState(false);

    const { bookingId } = useParams();

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getAllBooking());
    }, []);

    useEffect(() => {
        dispatch(getBookingDetail(bookingId));
    }, [bookingId]);

    return (
        <div className="px-2 lg:px-7 pt-0">
            <div className="flex flex-wrap w-full">
                <div className="w-full flex justify-between items-center cursor-pointer">
                    <span className="text-[30px]">Manage Hotels</span>
                    {/* <span
                        onClick={() => setOpenForm(!openForm)}
                        // onClick={() => setOpenForm(true)}
                        className="flex items-center gap-2 border bg-[#153243] text-[#FFF] pt-[7px] pb-[7px] pl-[20px] pr-[20px] rounded-full"
                    >
                        <FaPlusCircle />
                        Add hotel
                    </span> */}
                </div>

                <ModalBookingDetail
                    isOpen={openForm}
                    onClose={() => setOpenForm(false)}
                >
                    <h2 className="text-[25px] text-center font-bold mb-4">
                        Booking Detail
                    </h2>
                    <div
                        className={`w-full  translate-x-100 lg:relative lg:right-0 fixed ${
                            show ? "right-0" : "-right-[340px]"
                        } z-[9999] top-0 transition-all duration-500 `}
                    >
                        <div className="w-full ">
                            <div className="h-screen lg:h-auto px-5 py-[10px]  lg:rounded-md text-black">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="flex flex-col">
                                        <label className="text-[17px] font-semibold mb-1">
                                            Check-in Date:
                                            <span className="font-[500] ml-[10px]">
                                                {booking.checkInDate}
                                            </span>
                                        </label>
                                        <p className=""></p>
                                    </div>

                                    <div className="flex flex-col ml-5">
                                        <label className="text-[17px] font-semibold mb-1">
                                            Check-out Date:
                                            <span className="font-[500] ml-[10px]">
                                                {booking.checkOutDate}
                                            </span>
                                        </label>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-[17px] font-semibold mb-1">
                                            Number of Adults:
                                            <span className="font-[500] ml-[10px]">
                                                {booking.numOfAdults}
                                            </span>
                                        </label>
                                    </div>

                                    <div className="flex flex-col ml-5">
                                        <label className="text-[17px] font-semibold mb-1">
                                            Number of Children:
                                            <span className="font-[500] ml-[10px]">
                                                {booking.numOfChildren}
                                            </span>
                                        </label>
                                    </div>

                                    <table className="w-[750px] border-collapse  border text-left text-[16px] text-black ">
                                        <thead className="border-[#333] uppercase border text-center  text-[16px] ">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3 px-4 border w-[130px] border-[#333]"
                                                >
                                                    Photo
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3 px-4 border w-[50px] border-[#333]"
                                                >
                                                    RoomId
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3 px-4 border w-[170px] border-[#333]"
                                                >
                                                    Name Hotel
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3 px-4 border border-[#333]"
                                                >
                                                    Address Hotel
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td
                                                    scope="row"
                                                    className="py-3 px-4 font-medium whitespace-nowrap border border-[#333]"
                                                >
                                                    <img
                                                        className="h-[50px] w-[100px]"
                                                        src={
                                                            booking.room
                                                                ?.roomPhotoUrl
                                                        }
                                                        alt=""
                                                    />
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="py-3 px-4 font-medium whitespace-nowrap text-center border border-[#333]"
                                                >
                                                    {booking?.room?.id}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="py-3 px-4 font-medium whitespace-nowrap text-center border border-[#333]"
                                                >
                                                    {booking?.hotel?.name}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="py-3 px-4 font-medium whitespace-nowrap text-center border border-[#333]"
                                                >
                                                    {booking?.hotel?.address}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="flex-col col-span-2">
                                        <label className="text-[17px] font-semibold mb-1">
                                            Customer:
                                            {/* <span className="font-[500] ml-[10px]">
                                                {booking.user?.name}
                                            </span> */}
                                        </label>

                                        <table className="w-[750px] border-collapse  border text-left text-[16px] text-black mt-[15px]">
                                            <thead className="border-[#333] uppercase border text-center  text-[16px] ">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-4 border w-[115px] border-[#333]"
                                                    >
                                                        Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-3 border w-[50px] border-[#333]"
                                                    >
                                                        Phone
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-4 border w-[170px] border-[#333]"
                                                    >
                                                        Email
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        scope="row"
                                                        className="py-3 px-4 font-medium whitespace-nowrap border border-[#333] text-center"
                                                    >
                                                        {booking.user?.name}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="py-3 px-0 font-medium whitespace-nowrap text-center border border-[#333]"
                                                    >
                                                        {
                                                            booking.user
                                                                ?.phoneNumber
                                                        }
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="py-3 px-4 font-medium whitespace-nowrap text-center border border-[#333]"
                                                    >
                                                        {booking.user?.email}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="mt-[15px]">
                                            <label className="text-[17px] font-semibold mb-1">
                                                Total Price:
                                                <span className="font-[500] ml-[10px]">
                                                    {booking?.totalPrice
                                                        ? formatPrice(
                                                              booking.totalPrice
                                                          )
                                                        : "N/A"}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button
                                        type="button"
                                        className="bg-red-500 w-[100%] text-white font-semibold p-3 rounded-md"
                                        onClick={() => setOpenForm(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBookingDetail>

                <div className="w-full mt-3">
                    <div className="w-full p-4 bg-[#153243] rounded-md">
                        <Search
                            setParPage={setParPage}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        />

                        <div className="relative overflow-x-auto ">
                            <table className="w-full text-left text-[1.3rem] text-white  ">
                                <thead className="border-slate-700 uppercase border-b text-[1.4rem] ">
                                    <tr>
                                        <th scope="col" className="py-3 px-4">
                                            No
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            CheckInDate
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            CheckOutDate
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            TotalNumOfGuest
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            TotalPrice
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {booking?.id}
                                            </td>
                                            {/* <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                <img
                                                    className="w-[45px] h-[45px]"
                                                    src=""
                                                    alt=""
                                                />
                                            </td> */}
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {booking?.checkInDate}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {booking?.checkOutDate}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {booking?.totalNumOfGuest}
                                            </td>

                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {booking?.totalPrice
                                                    ? formatPrice(
                                                          booking.totalPrice
                                                      )
                                                    : "N/A"}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                <div className="flex justify-center items-center gap-4">
                                                    <Link
                                                        onClick={() =>
                                                            setOpenForm(
                                                                !openForm
                                                            )
                                                        }
                                                        to={`/vendor/booking/${booking.id}`}
                                                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                                                    >
                                                        <FaMagnifyingGlass />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="w-full justify-end flex mt-4 bottom-4 right-4 ">
                            <Pagination
                                pageNumber={currentPage}
                                setPageNumber={setCurrentPage}
                                totalItem={50}
                                parPage={parPage}
                                showItem={3}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <ModalConfirmDelete
                isOpen={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={confirmDeleteHotel}
            /> */}
        </div>
    );
}

export default Booking;
