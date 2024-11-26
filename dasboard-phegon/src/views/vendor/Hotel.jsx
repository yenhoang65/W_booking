import { useEffect, useState } from "react";
import {
    // FaCheck,
    FaEdit,
    FaImage,
    FaPlusCircle,
    FaTrash,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
// import SPLoader from "../components/SprinnerLoader";
import { RingLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
    addHotel,
    deleteHotel,
    fetchHotelById,
    fetchUpdateHotel,
    getHotelAll,
    messageClear,
} from "../../store/reducer/hotelReducer";
import toast from "react-hot-toast";
import ModalConfirmDelete from "../components/ModalConfirm.Delete";
const Hotel = () => {
    const dispatch = useDispatch();
    const { hotels, successMessage, errorMessage, hotel } = useSelector(
        (state) => state.hotel
    );
    const navigate = useNavigate();
    const [openForm, setOpenForm] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [parPage, setParPage] = useState(5);
    const [searchValue, setSearchValue] = useState("");
    const [show, setShow] = useState(false);
    const [state, setState] = useState({
        name: "",
        address: "",
        nation: "",
        city: "",
        photo: "",
        description: "",
    });

    const { hotelId } = useParams();

    const [loader, setLoader] = useState(false);

    const [imageShow, setImageShow] = useState(null);

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
    // lấy thông tin hotel
    useEffect(() => {
        dispatch(getHotelAll());
    }, []);

    useEffect(() => {
        dispatch(fetchHotelById(hotelId));
    }, [hotelId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", state.photo);
        formData.append("name", state.name);
        formData.append("city", state.city);
        formData.append("nation", state.nation);
        formData.append("address", state.address);
        formData.append("description", state.description);

        dispatch(addHotel(formData));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            dispatch(getHotelAll());
            navigate("/vendor/hotel");
            setOpenForm(false);
        }
        if (errorMessage) {
            toast.success(errorMessage);
        }
    }, [successMessage, errorMessage]);

    // edit

    useEffect(() => {
        if (hotel) {
            setState({
                name: hotel?.name || "",
                address: hotel?.address || "",
                city: hotel?.city || "",
                nation: hotel?.nation || "",
                description: hotel?.description || "",
            });
            setImageShow(hotel.photo);
        }
    }, [hotel]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("address", state.address);
        formData.append("city", state.city);
        formData.append("nation", state.nation);
        formData.append("description", state.description);
        formData.append("photo", state.photo);
        dispatch(fetchUpdateHotel({ hotelId: hotel.id, formData }));
    };

    // delete

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [hotelToDelete, setHotelToDelete] = useState(null);
    const handleDeleteHotel = (id) => {
        setHotelToDelete(id);
        setShowConfirmDelete(true);
    };

    const confirmDeleteHotel = () => {
        dispatch(deleteHotel(hotelToDelete));
        setShowConfirmDelete(false);
    };

    return (
        <div className="px-2 lg:px-7 pt-0">
            <div className="flex flex-wrap w-full">
                <div className="w-full flex justify-between items-center cursor-pointer">
                    <span className="text-[30px]">Manage Hotels</span>
                    <span
                        onClick={() => setOpenForm(!openForm)}
                        // onClick={() => setOpenForm(true)}
                        className="flex items-center gap-2 border bg-[#153243] text-[#FFF] pt-[7px] pb-[7px] pl-[20px] pr-[20px] rounded-full"
                    >
                        <FaPlusCircle />
                        Add hotel
                    </span>
                </div>

                <Modal isOpen={openForm} onClose={() => setOpenForm(false)}>
                    <h2 className="text-[25px] text-center font-bold ">
                        {hotelId ? "Update Hotel" : "Add Hotel"}
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
                                        hotelId
                                            ? handleEditSubmit
                                            : handleSubmit
                                    }
                                >
                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label
                                            className="text-[17px]"
                                            htmlFor="name"
                                        >
                                            Name:
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    name: e.target.value,
                                                })
                                            }
                                            value={state.name}
                                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Name"
                                        />
                                    </div>

                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label
                                            className="text-[17px]"
                                            htmlFor="city"
                                        >
                                            City:
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    city: e.target.value,
                                                })
                                            }
                                            value={state.city}
                                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder="City"
                                        />
                                    </div>

                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label
                                            className="text-[17px]"
                                            htmlFor="nation"
                                        >
                                            Nation:
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    nation: e.target.value,
                                                })
                                            }
                                            value={state.nation}
                                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                            type="text"
                                            id="nation"
                                            name="nation"
                                            placeholder="Nation"
                                        />
                                    </div>

                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label
                                            className="text-[17px]"
                                            htmlFor="address"
                                        >
                                            Address:
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    address: e.target.value,
                                                })
                                            }
                                            value={state.address}
                                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Address"
                                        />
                                    </div>

                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label
                                            className="text-[17px]"
                                            htmlFor="description"
                                        >
                                            Description:
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    description: e.target.value,
                                                })
                                            }
                                            value={state.description}
                                            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                            type="text"
                                            id="description"
                                            name="description"
                                            placeholder="Description"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]"
                                            htmlFor="photo"
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
                                            name="photo"
                                            id="photo"
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
                                                ) : hotelId ? (
                                                    "Update Hotel"
                                                ) : (
                                                    "Add Hotel"
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
                                            Photo
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            Name
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            City
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            Nation
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hotels.map((hotel) => (
                                        <tr key={hotel.id}>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {hotel.id}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                <img
                                                    className="w-[45px] h-[45px]"
                                                    src={hotel.photo}
                                                    alt=""
                                                />
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {hotel.name}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {hotel.city}
                                            </td>
                                            <td
                                                scope="row"
                                                className="py-3 px-4 font-medium whitespace-nowrap"
                                            >
                                                {hotel.nation}
                                            </td>
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
                                                        to={`/vendor/hotel/${hotel.id}`}
                                                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <Link
                                                        // onClick={() =>
                                                        //     handleDeleteHotel(
                                                        //         hotel.id
                                                        //     )
                                                        // }
                                                        onClick={() =>
                                                            handleDeleteHotel(
                                                                hotel.id
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
                onConfirm={confirmDeleteHotel}
            />
        </div>
    );
};

export default Hotel;
