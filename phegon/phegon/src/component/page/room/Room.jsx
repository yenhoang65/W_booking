// import Rectangle6084 from "./../../../../public/image/Rectangle6084.png";
// import image929 from "./../../../../public/image/image929.png";
// import scroll from "./../../../../public/image/Scroll.svg";
import Footer from "../../common/footer";
// import { IoMdSearch } from "react-icons/io";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRoomAll } from "../../store/reducer/roomReducer";
import RoomTrip from "./RoomTrip";

function Room() {
    const dispatch = useDispatch();
    const { rooms } = useSelector((state) => state.room);
    const [showMore, setShowMore] = useState(false);
    const [showArea, setShowArea] = useState(false);
    useEffect(() => {
        dispatch(getRoomAll());
    }, []);
    return (
        <>
            <div className="m-auto w-[1150px] mt-[60px]">
                <div className="grid grid-cols-4 gap-5">
                    <div className="col-span-1">
                        <div className="border pb-10 rounded-lg border-[#adb5bd]">
                            <div className="border-b border-[#adb5bd]">
                                <h3 className="ml-5 py-2 font-[600] text-[#6c757d] ">
                                    Chọn lọc theo:
                                </h3>
                            </div>

                            <div className="">
                                <h3 className="ml-5 mt-3 font-[600] text-[#6c757d] ">
                                    Các bộ lọc phổ biến
                                </h3>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Hồ bơi</h5>
                                </div>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Nhìn ra biển</h5>
                                </div>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Có ban công</h5>
                                </div>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Bao gồm bữa sáng</h5>
                                </div>
                            </div>
                            <div className="border-t border-[#adb5bd] mt-4">
                                <h3 className="ml-5 mt-3 font-[600] text-[#6c757d] ">
                                    Khu du lịch
                                </h3>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Bãi biển Thọ Quang</h5>
                                </div>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Bán đảo Sơn Trà</h5>
                                </div>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Bãi biển Mỹ Khê</h5>
                                </div>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Cửa Lò Nghệ An</h5>
                                </div>
                                {showMore && (
                                    <>
                                        <div className="flex ml-5 mt-3">
                                            <input
                                                className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                                type="checkbox"
                                            />
                                            <h5 className="ml-2">Sông Hàn</h5>
                                        </div>
                                        <div className="flex ml-5 mt-3">
                                            <input
                                                className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                                type="checkbox"
                                            />
                                            <h5 className="ml-2">
                                                Bãi biển Mỹ An
                                            </h5>
                                        </div>
                                        <div className="flex ml-5 mt-3">
                                            <input
                                                className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                                type="checkbox"
                                            />
                                            <h5 className="ml-2">
                                                Vịnh Hạ Long
                                            </h5>
                                        </div>
                                        <div className="flex ml-5 mt-3">
                                            <input
                                                className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                                type="checkbox"
                                            />
                                            <h5 className="ml-2">
                                                Vịnh Đà Nẵng
                                            </h5>
                                        </div>
                                    </>
                                )}
                                <div className="ml-5 mt-3">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => setShowMore(!showMore)}
                                    >
                                        {showMore ? "Thu gọn" : "Xem thêm"}
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-[#adb5bd] mt-4">
                                <h3 className="ml-5 mt-3 font-[600] text-[#6c757d] ">
                                    Khu vực
                                </h3>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Hà Nội</h5>
                                </div>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">
                                        Thành phố Hồ Chí Minh
                                    </h5>
                                </div>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Đà Nẵng</h5>
                                </div>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Nghệ An</h5>
                                </div>
                                {showArea && (
                                    <>
                                        <div className="flex ml-5 mt-3">
                                            <input
                                                className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                                type="checkbox"
                                            />
                                            <h5 className="ml-2">Vinh</h5>
                                        </div>
                                        <div className="flex ml-5 mt-3">
                                            <input
                                                className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                                type="checkbox"
                                            />
                                            <h5 className="ml-2">Quảng Ninh</h5>
                                        </div>
                                        <div className="flex ml-5 mt-3">
                                            <input
                                                className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                                type="checkbox"
                                            />
                                            <h5 className="ml-2">Thanh Hóa</h5>
                                        </div>
                                        <div className="flex ml-5 mt-3">
                                            <input
                                                className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                                type="checkbox"
                                            />
                                            <h5 className="ml-2">Hải Phòng</h5>
                                        </div>
                                    </>
                                )}
                                <div className="ml-5 mt-3">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => setShowArea(!showArea)}
                                    >
                                        {showArea ? "Thu gọn" : "Xem thêm"}
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-[#adb5bd] mt-4">
                                <h3 className="ml-5 mt-3 font-[600] text-[#6c757d] ">
                                    Tùy chọn giường
                                </h3>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Giường đôi</h5>
                                </div>
                                <div className="flex ml-5 mt-3">
                                    <input
                                        className="w-4 h-4 mt-[3px] border-2 border-gray-300 rounded-sm"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <h5 className="ml-2">Giường đơn</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className=" mb-[100px] col-span-3">
                        <div className="grid grid-cols-1 gap-5 ">
                            {rooms.map((room) => (
                                <RoomTrip
                                    key={room.id}
                                    roomPhotoUrl={room.roomPhotoUrl}
                                    roomDescription={room.roomDescription}
                                    roomType={room.roomType}
                                    roomPrice={room.roomPrice}
                                    roomPlace={room.hotel?.name}
                                    hotelAddress={room.hotel?.address}
                                    hotelCity={room.hotel?.city}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Room;
