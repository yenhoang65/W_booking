import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import header from "../../../../public/image/header-03.jpg";
import { TiLocationOutline } from "react-icons/ti";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GoShareAndroid } from "react-icons/go";
import { responsive2 } from "../../../utils/utils";
import Carousel from "react-multi-carousel";
import { CiCircleMore } from "react-icons/ci";
import { BsPCircle } from "react-icons/bs";
import Footer from "../../common/footer";
import RoomEmpty from "./RoomEmpty";
import GeneralRules from "./GeneralRules";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoomById } from "../../store/reducer/roomReducer";

const RoomDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { room } = useSelector((state) => state.room);
    const { roomId } = useParams();

    useEffect(() => {
        dispatch(getRoomById(roomId));
    }, [roomId]);

    const redirect = () => {
        navigate("/checkout", {
            state: {
                roomId: room.id,
            },
        });
    };
    return (
        <>
            <div className="w-[1150px] m-auto pb-[50px]">
                <div className="mt-[10px] flex">
                    <Link to="/room">Room</Link>
                    <IoIosArrowForward className="mt-[4px]" />
                    <span>RoomDetail</span>
                </div>

                <div className="grid grid-cols-5 mt-[15px] text-center border-b border-b-[#adb5bd]">
                    <div className="hover:bg-[#e9ecef] py-2 cursor-pointer ">
                        Overview
                    </div>
                    <div className="hover:bg-[#e9ecef] py-2 cursor-pointer">
                        Information & Price
                    </div>
                    <div className="hover:bg-[#e9ecef] py-2 cursor-pointer">
                        Facilities
                    </div>
                    <div className="hover:bg-[#e9ecef] py-2 cursor-pointer">
                        General rules
                    </div>
                    <div className="hover:bg-[#e9ecef] py-2 cursor-pointer">
                        Hotel reviews
                    </div>
                </div>

                <div className="mt-[20px] flex justify-between">
                    <h1 className="text-[30px] font-[600] text-[#343a40] font-sans">
                        {/* Hanoi B Hotel & Travel - 5 mins Hoan Kiem lake{" "} */}
                        {room.roomType}
                    </h1>

                    <div className="flex  text-[25px] text-[#0077b6] gap-2">
                        <MdOutlineFavoriteBorder className="mt-[7px]" />
                        <GoShareAndroid className="mt-[7px]" />
                        <div
                            onClick={redirect}
                            className="border cursor-pointer text-[18px] px-5 py-2 text-[#fff] bg-sky-600 rounded-lg"
                        >
                            Book Now
                        </div>
                    </div>
                </div>

                <div className="mt-[] flex">
                    <TiLocationOutline className="mt-[6px] text-[20px]" />
                    <h1 className="text-[20px] font-[500] text-[#343a40] font-sans ml-2">
                        {/* 1065 Hong Ha, Quận Hoàn Kiếm, Hà Nội, Việt Nam */}
                        {room?.hotel?.address}
                    </h1>
                </div>

                <div className="grid grid-cols-3 mt-[30px]">
                    <div className="col-span-2">
                        <img
                            className="rounded-md h-[485px]"
                            src={room.roomPhotoUrl}
                            alt=""
                        />
                    </div>
                    <div className="ml-[30px] w-[92%] col-span-1">
                        <div className="border overflow-hidden ">
                            <div className="border py-2 justify-end flex">
                                <div className="mr-[10px]">
                                    <span className="font-[600] text-[18px]">
                                        Review
                                    </span>
                                    <br />
                                    <span className="">....</span>
                                </div>

                                <CiCircleMore className="mr-[15px] mt-2 text-[40px]" />
                            </div>
                            <div>
                                <Carousel
                                    autoPlay={false}
                                    infinite={true}
                                    responsive={responsive2}
                                    arrows={true}
                                    transitionDuration={500}
                                    itemClass="mx-2.5 pb-[30px] "
                                >
                                    <div className="flex flex-wrap w-full p-2">
                                        <span className="mt-5">
                                            Lorem ipsum dolor sit amet
                                            consectetur, adipisicing elit.
                                            Laboriosam ipsum totam cumque vel
                                            repudiandae debitis ducimus eaque,
                                            sint voluptatum excepturi?
                                        </span>
                                        <span className="mt-[20px]">
                                            Quan, VietNam
                                        </span>
                                    </div>
                                </Carousel>
                            </div>
                            <div className="border py-4 ">
                                <div className="mr-[10px]">
                                    <span className="ml-[20px] font-[600]">
                                        Nhân Viên Phục Vụ
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="border mt-9 p-5 bg-[#caf0f8] rounded-md">
                            <h1 className="font-[600] text-[18px]">
                                Điểm nổi bật của chỗ nghỉ
                            </h1>
                            <div className="flex mt-5">
                                <BsPCircle className="mt-1" />
                                <h1 className="ml-2">Có chỗ để xe ô tô</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 w-[800px]">
                    <span>{room.roomDescription}</span>
                </div>

                <div className="mt-10 w-[800px]">
                    <h1 className="font-[700] text-[25px]">
                        Most popular amenities
                    </h1>
                </div>

                <div className="mt-10 w-[800px]">
                    <h1 className="font-[700] text-[25px]">Room is empty</h1>
                    <RoomEmpty />
                </div>

                <div className=" w-[1150px]">
                    <GeneralRules />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RoomDetail;
