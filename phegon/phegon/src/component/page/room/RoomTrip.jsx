import star from "../../../../public/image/star.svg";
import para from "../../../../public/image/Rectangle69.png";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineBedroomParent, MdOutlineLocationOn } from "react-icons/md";
const RoomTrip = ({
    roomPhotoUrl,
    roomDescription,
    roomPlace,
    roomType,
    roomPrice,
    hotelAddress,
    hotelCity,
}) => {
    return (
        <div className="px-3 pb-[20px] pt-3 hover:shadow-search rounded-[20px] flex font-sans">
            <div className="">
                <img
                    src={roomPhotoUrl}
                    alt=""
                    className="h-[300px] w-[350px] object-cover rounded-[20px]"
                />
            </div>
            <div className="ml-5 px-2">
                <div className="flex">
                    <div>
                        <div className="flex">
                            <h2 className="text-[22px] font-bold line-clamp-2 text-[#003b95] w-[350px]">
                                {roomPlace}
                            </h2>
                            <div className="w-[100px] ml-2 ">
                                <div className="">
                                    <div className="flex items-center gap-[5px] px-[12px] py-[4px] rounded-full bg-[#FFF7DA]">
                                        <img
                                            src={star}
                                            alt=""
                                            className="ml-3"
                                        />
                                        4.5
                                    </div>
                                    {/* <span>(3.9K Reviews)</span> */}
                                </div>
                            </div>
                        </div>

                        <h3 className="text-[18px] mt-1 text-[#003b95] flex font-semibold">
                            <MdOutlineLocationOn className="mt-[6px]" />
                            <p className="ml-1">{hotelCity}</p>
                        </h3>
                        <h3 className="text-[18px]  mt-1 flex font-semibold">
                            <MdOutlineBedroomParent className="mt-[6px] " />

                            <p className="ml-1">{roomType}</p>
                        </h3>
                        <div className="mt-2">
                            <h3 className="text-[19px] text-[#003b95] font-semibold">
                                Các tiện nghi:
                            </h3>

                            <div className="flex mt-3">
                                <h3 className="text-[17px] rounded-full border border-[#6c757d] px-2 flex">
                                    {/* <MdOutlineBedroomParent className="mt-[6px]" /> */}

                                    <p className="ml-">{roomType}</p>
                                </h3>
                                <h3 className="text-[20px] flex">
                                    {/* <MdOutlineBedroomParent className="mt-[6px]" /> */}

                                    <p className="ml-1">{roomType}</p>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <span className="text-[20px] font-bold  text-[#3E7EFF] flex justify-end">
                        {roomPrice.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RoomTrip;
