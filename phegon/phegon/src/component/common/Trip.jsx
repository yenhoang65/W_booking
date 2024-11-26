import { Link } from "react-router-dom";
import star from "../../../public/image/star.svg";

const Trip = ({
    roomPhotoUrl,
    roomDescription,
    roomPlace,
    roomType,
    roomPrice,
    roomId,
}) => {
    return (
        <Link to={`/room/detail/${roomId}`}>
            <div className="px-3 pb-[20px] pt-3 hover:shadow-search rounded-[20px]">
                <div className="flex items-center w-full justify-center">
                    <img
                        src={roomPhotoUrl}
                        alt=""
                        className="h-[270px] w-full object-cover rounded-[20px]"
                    />
                </div>
                <div className="mt-[16px] px-2">
                    <h3 className="text-[14px]">{roomType}</h3>
                    <h2 className="text-[22px] font-bold line-clamp-2">
                        {roomPlace}
                    </h2>
                    <div className="flex gap-[10px] pt-[16px] items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex items-center gap-[10px] px-[12px] py-[4px] rounded-full bg-[#FFF7DA]">
                                <img src={star} alt="" />
                                4.5
                            </div>
                            <span>(3.9K Reviews)</span>
                        </div>
                        <div>
                            <span className="text-[20px] font-bold text-red-300">
                                {roomPrice}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Trip;
