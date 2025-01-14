import { useEffect, useRef, useState } from "react";
import { FaEdit, FaImage, FaPlusCircle, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import { RingLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
    addRoom,
    deleteRoom,
    getRoomAll,
    messageClear,
    roomById,
    updateRoom,
} from "../../store/reducer/roomReducer";
import { limitText, limitTextDes } from "../../utils/utils";
import toast from "react-hot-toast";
import { getHotelAll } from "../../store/reducer/hotelReducer";
import ModalConfirmDelete from "../components/ModalConfirm.Delete";
import JoditEditor from "jodit-react";

const Room = () => {
    const [openForm, setOpenForm] = useState(false);

    const dispatch = useDispatch();

    const { rooms, successMessage, errorMessage, room } = useSelector(
        (state) => state.room
    );

    const editor = useRef(null);

    const { hotels } = useSelector((state) => state.hotel);
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [parPage, setParPage] = useState(5);
    const [searchValue, setSearchValue] = useState("");
    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(false);
    const [state, setState] = useState({
        hotelId: "",
        roomPrice: "",
        photo: "",
        roomType: "",
        amenities: "",
        status: "",
        roomDescription: "",
    });

    const [imageShow, setImageShow] = useState("");

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
        dispatch(getHotelAll());
    }, []);

    useEffect(() => {
        dispatch(getRoomAll());
    }, []);

    useEffect(() => {
        dispatch(roomById(roomId));
    }, [roomId]);

    //add

    const handleSubmitAddRoom = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("hotelId", state.hotelId);
        formData.append("roomPrice", state.roomPrice);
        formData.append("photo", state.photo);
        formData.append("roomType", state.roomType);
        formData.append("status", state.status);
        formData.append("amenities", state.amenities);
        formData.append("roomDescription", state.roomDescription);

        dispatch(addRoom(formData));
    };
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            dispatch(getRoomAll());
            navigate("/vendor/room");
            setOpenForm(false);
        }
        if (errorMessage) {
            toast.success(errorMessage);
        }
    }, [successMessage, errorMessage]);

    // edit

    useEffect(() => {
        if (room) {
            setState({
                hotelId: room?.hotel?.id || "",
                roomPrice: room?.roomPrice || "",
                roomType: room?.roomType || "",
                status: room?.status || "",
                amenities: room?.amenities || "",
                roomDescription: room?.roomDescription || "",
            });
            setImageShow(room.roomPhotoUrl);
        }
    }, [room]);

    const handleEditRoomSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("hotelId", state.hotelId);
        formData.append("roomPrice", state.roomPrice);
        formData.append("photo", state.photo);
        formData.append("roomType", state.roomType);
        formData.append("status", state.status);
        formData.append("amenities", state.amenities);
        formData.append("roomDescription", state.roomDescription);
        dispatch(updateRoom({ roomId: room.id, formData }));
    };

    // delete
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [hotelToDelete, setRoomToDelete] = useState(null);
    const handleDelete = (id) => {
        setRoomToDelete(id);
        setShowConfirmDelete(true);
    };

    const confirmDelete = () => {
        dispatch(deleteRoom(hotelToDelete));
        setShowConfirmDelete(false);
    };

    // const amenitiesOptions = [
    //     "Free Wi-Fi",
    //     "Air Conditioning",
    //     "Swimming Pool",
    //     "Fitness Center",
    //     "Room Service",
    //     "Flat Screen TV",
    //     "Mini Bar",
    //     "Private Balcony",
    //     "Hot Tub",
    //     "Parking",
    //     "Pet Friendly",
    //     "Spa Services",
    //     "Airport Shuttle",
    //     "Laundry Service",
    //     "Restaurant",
    //     "Conference Room",
    //     "Breakfast Included",
    // ];

    return (
        <div className="px-2 lg:px-7 pt-0">
            <div className="flex flex-wrap w-full">
                <div className="w-full flex justify-between items-center cursor-pointer">
                    <span className="text-[30px]">Manage Room</span>
                    <span
                        onClick={() => setOpenForm(!openForm)}
                        className="flex items-center gap-2 border bg-[#153243] text-[#FFF] pt-[7px] pb-[7px] pl-[20px] pr-[20px] rounded-full"
                    >
                        <FaPlusCircle /> Add Room
                    </span>
                </div>

                <Modal isOpen={openForm} onClose={() => setOpenForm(false)}>
                    <h2 className="text-[25px] text-center font-bold ">
                        {roomId ? "Update Room" : "Add Room"}
                    </h2>
                    <div
                        className={`w-full translate-x-100 lg:relative lg:right-0 fixed ${
                            show ? "right-0" : "-right-[340px]"
                        } z-[9999] top-0 transition-all duration-500 `}
                    >
                        <div className="w-full ">
                            <div className=" h-screen lg:h-auto px-5 py-[10px] lg:rounded-md text-black">
                                <form
                                    onSubmit={
                                        roomId
                                            ? handleEditRoomSubmit
                                            : handleSubmitAddRoom
                                    }
                                >
                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label
                                            className="text-[17px]"
                                            htmlFor="hotelId"
                                        >
                                            HotelId:
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    hotelId: e.target.value,
                                                })
                                            }
                                            value={state.hotelId}
                                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                            id="hotelId"
                                            name="hotelId"
                                        >
                                            <option value="">
                                                Select Hotel
                                            </option>
                                            {hotels.map((hotel) => (
                                                <option
                                                    key={hotel.id}
                                                    value={hotel.id}
                                                >
                                                    {hotel.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label
                                            className="text-[17px]"
                                            htmlFor="roomType"
                                        >
                                            RoomType:
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    roomType: e.target.value,
                                                })
                                            }
                                            value={state.roomType}
                                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                            type="text"
                                            id="roomType"
                                            name="roomType"
                                            placeholder="RoomType"
                                        />
                                    </div>

                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label
                                            className="text-[17px]"
                                            htmlFor="roomPrice"
                                        >
                                            RoomPrice:
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    roomPrice: e.target.value,
                                                })
                                            }
                                            value={state.roomPrice}
                                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                            type="text"
                                            id="roomPrice"
                                            name="roomPrice"
                                            placeholder="roomPrice"
                                        />
                                    </div>

                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label
                                            className="text-[17px]"
                                            htmlFor="description"
                                        >
                                            Description:
                                        </label>
                                        {/* <input
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    roomDescription:
                                                        e.target.value,
                                                })
                                            }
                                            value={state.roomDescription}
                                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                            type="text"
                                            id="roomDescription"
                                            name="roomDescription"
                                            placeholder="Description"
                                        /> */}
                                        <JoditEditor
                                            ref={editor}
                                            value={state.roomDescription}
                                            onChange={(newContent) =>
                                                setState({
                                                    ...state,
                                                    roomDescription: newContent,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label
                                            className="text-[17px]"
                                            htmlFor="status"
                                        >
                                            Status:
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    status: e.target.value,
                                                })
                                            }
                                            value={state.status}
                                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                            id="status"
                                            name="status"
                                        >
                                            <option value="0">Active</option>
                                            <option value="1">InActive</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            className="flex justify-center items-center flex-col h-[130px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]"
                                            htmlFor="image"
                                        >
                                            {imageShow ? (
                                                <img
                                                    src={imageShow}
                                                    className="w-full h-full object-contain"
                                                    alt=""
                                                />
                                            ) : (
                                                <>
                                                    <span>
                                                        <FaImage />
                                                    </span>
                                                    <span>Select Image</span>
                                                </>
                                            )}
                                        </label>
                                        <input
                                            onChange={imageHandle}
                                            className="hidden"
                                            type="file"
                                            name="image"
                                            id="image"
                                        />
                                        <div>
                                            <button
                                                type="submit"
                                                className="mt-4 bg-red-500 w-[100%] text-white font-semibold p-3"
                                            >
                                                {loader ? (
                                                    <RingLoader
                                                        color="#fff"
                                                        size={30}
                                                        speedMultiplier={1}
                                                    />
                                                ) : roomId ? (
                                                    "Update Room"
                                                ) : (
                                                    "Add Room"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>

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
                                            Hotel
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            Image
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            RoomType
                                        </th>

                                        <th scope="col" className="py-3 px-4">
                                            RoomPrice
                                        </th>

                                        <th scope="col" className="py-3 px-4 ">
                                            RoomDescription
                                        </th>

                                        {/* <th scope="col" className="py-3 px-4">
                                            Status
                                        </th> */}
                                        <th scope="col" className="py-3 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map((room) => (
                                        <tr key={room.id}>
                                            <td
                                                scope="row"
                                                className="py-3 px-4  font-medium whitespace-nowrap"
                                            >
                                                {room.id}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-4  font-medium whitespace-nowrap"
                                            >
                                                {room.hotel.name}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                <img
                                                    className="w-[65px] h-[65px]"
                                                    src={room.roomPhotoUrl}
                                                    alt="{category.name}"
                                                />
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {room.roomType}
                                            </td>

                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {new Intl.NumberFormat(
                                                    "vi-VN",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                ).format(room.roomPrice)}
                                            </td>

                                            <td
                                                className="italic py-3 px-4 font-medium"
                                                dangerouslySetInnerHTML={{
                                                    __html: limitTextDes(
                                                        room.roomDescription,
                                                        25
                                                    ),
                                                }}
                                                scope="row"
                                            >
                                                {/* {limitText(
                                                    room.roomDescription,
                                                    25
                                                )} */}
                                            </td>

                                            {/* <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {room.status}
                                            </td> */}
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                <div className="flex justify-start items-center gap-4">
                                                    <Link
                                                        onClick={() =>
                                                            setOpenForm(
                                                                !openForm
                                                            )
                                                        }
                                                        to={`/vendor/room/${room.id}`}
                                                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <Link
                                                        onClick={() =>
                                                            handleDelete(
                                                                room.id
                                                            )
                                                        }
                                                        className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                                                    >
                                                        <FaTrash />
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
            <ModalConfirmDelete
                isOpen={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default Room;
