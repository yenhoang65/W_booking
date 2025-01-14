import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomAll } from "../../store/reducer/roomReducer";
import RoomTrip from "./RoomTrip";
import Header from "../../common/header";
import Footer from "../../common/footer";
import api from "../../../service/ApiService";

function Room() {
    const dispatch = useDispatch();
    const { rooms } = useSelector((state) => state.room);

    // State
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [roomType, setRoomType] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showArea, setShowArea] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [selectedNation, setSelectedNation] = useState(""); // State cho quốc gia
    const [selectedCity, setSelectedCity] = useState(""); // State cho thành phố
    const [selectedAmenities, setSelectedAmenities] = useState([]); // State cho tiện ích
    const [selectedTouristAttraction, setSelectedTouristAttraction] =
        useState(""); // State cho khu du lịch

    // Lấy danh sách phòng ban đầu
    useEffect(() => {
        dispatch(getRoomAll());
    }, [dispatch]);

    // Gọi API tìm kiếm theo ngày, loại phòng
    const handleSearch = async () => {
        if (!checkInDate || !checkOutDate || !roomType) {
            alert("Vui lòng nhập đầy đủ thông tin tìm kiếm!");
            return;
        }

        try {
            const response = await api.get(
                "/users/rooms/available-rooms-by-date-and-type",
                {
                    params: {
                        checkInDate,
                        checkOutDate,
                        roomType,
                    },
                }
            );
            setSearchResults(response.data.roomList || []);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm phòng:", error);
            alert("Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại!");
        }
    };

    // Gọi API lọc theo quốc gia
    const handleFilterByNation = async (nation) => {
        try {
            setSelectedNation(nation); // Cập nhật quốc gia được chọn
            const response = await api.get("/users/rooms-by-nation", {
                params: { nation },
            });
            setSearchResults(response.data.roomList || []);
        } catch (error) {
            console.error("Lỗi khi lọc phòng:", error);
            alert("Đã xảy ra lỗi khi lọc phòng. Vui lòng thử lại!");
        }
    };

    // Gọi API lọc theo thành phố
    const handleFilterByCity = async (city) => {
        try {
            setSelectedCity(city);
            const response = await api.get("/users/rooms-by-city", {
                params: { city },
            });
            setSearchResults(response.data.roomList || []);
        } catch (error) {
            console.error("Lỗi khi lọc phòng theo thành phố:", error);
            alert(
                "Đã xảy ra lỗi khi lọc phòng theo thành phố. Vui lòng thử lại!"
            );
        }
    };

    // Xử lý chọn tiện ích
    const handleAmenitiesChange = (amenity) => {
        setSelectedAmenities((prev) => {
            if (prev.includes(amenity)) {
                return prev.filter((item) => item !== amenity);
            } else {
                return [...prev, amenity];
            }
        });
    };

    // Gọi API lọc theo tiện ích
    const handleFilterByAmenities = async () => {
        try {
            const response = await api.get("/users/rooms-by-amenities", {
                params: { amenities: selectedAmenities.join(",") },
            });
            setSearchResults(response.data.roomList || []);
        } catch (error) {
            console.error("Lỗi khi lọc phòng theo tiện ích:", error);
            alert(
                "Đã xảy ra lỗi khi lọc phòng theo tiện ích. Vui lòng thử lại!"
            );
        }
    };

    return (
        <>
            <Header />
            <div className="bg-gray-100 py-10">
                <div className="container mx-auto">
                    <div className="bg-white p-5 rounded-lg shadow-md flex flex-wrap gap-5">
                        <div className="flex flex-col flex-1">
                            <label className="font-medium text-gray-700">
                                Ngày nhận phòng
                            </label>
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className="border rounded-md p-2 mt-1"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-medium text-gray-700">
                                Ngày trả phòng
                            </label>
                            <input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) =>
                                    setCheckOutDate(e.target.value)
                                }
                                className="border rounded-md p-2 mt-1"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-medium text-gray-700">
                                Loại phòng
                            </label>
                            <select
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="border rounded-md p-2 mt-1"
                            >
                                <option value="">Chọn loại phòng</option>
                                <option value="HoneymoonSuite">
                                    Phòng đơn
                                </option>
                                <option value="Garden View Room">
                                    Phòng đôi
                                </option>
                                <option value="Suite">Phòng Suite</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={handleSearch}
                                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-5 mt-10">
                        {/* Bộ lọc bên trái */}
                        <div className="col-span-1 sticky top-20 self-start">
                            <div className="border pb-10 rounded-lg border-[#adb5bd]">
                                <div className="border-b border-[#adb5bd]">
                                    <h3 className="ml-5 py-2 font-[600] text-[#6c757d] ">
                                        Chọn lọc theo:
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="ml-5 mt-3 font-[600] text-[#6c757d] ">
                                        Khu vực
                                    </h3>
                                    {[
                                        "USA",
                                        "Viet Nam",
                                        "Australia",
                                        "UAE",
                                        "Thailand",
                                    ].map((nation) => (
                                        <div
                                            key={nation}
                                            className="flex ml-5 mt-3"
                                        >
                                            <input
                                                type="radio"
                                                id={nation}
                                                name="nationFilter"
                                                className="w-4 h-4"
                                                checked={
                                                    selectedNation === nation
                                                }
                                                onChange={() =>
                                                    handleFilterByNation(nation)
                                                }
                                            />
                                            <label
                                                htmlFor={nation}
                                                className="ml-2"
                                            >
                                                {nation}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-[#adb5bd] mt-4">
                                    <h3 className="ml-5 mt-3 font-[600] text-[#6c757d] ">
                                        Thành phố
                                    </h3>
                                    {[
                                        "New York",
                                        "Hà Nội",
                                        "Sydney",
                                        "Dubai",
                                        "Bangkok",
                                    ].map((city) => (
                                        <div
                                            key={city}
                                            className="flex ml-5 mt-3"
                                        >
                                            <input
                                                type="radio"
                                                id={city}
                                                name="cityFilter"
                                                className="w-4 h-4"
                                                checked={selectedCity === city}
                                                onChange={() =>
                                                    handleFilterByCity(city)
                                                }
                                            />
                                            <label
                                                htmlFor={city}
                                                className="ml-2"
                                            >
                                                {city}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-[#adb5bd] mt-4">
                                    <h3 className="ml-5 mt-3 font-[600] text-[#6c757d] ">
                                        Khu du lịch
                                    </h3>
                                    {[
                                        "Bãi biển Thọ Quang",
                                        "Bán đảo Sơn Trà",
                                        "Sông Hàn",
                                        "Bãi biển Mỹ Khê",
                                    ].map((attraction) => (
                                        <div
                                            key={attraction}
                                            className="flex ml-5 mt-3"
                                        >
                                            <input
                                                type="radio"
                                                id={attraction}
                                                name="attractionFilter"
                                                className="w-4 h-4"
                                                checked={
                                                    selectedTouristAttraction ===
                                                    attraction
                                                }
                                                onChange={() =>
                                                    setSelectedTouristAttraction(
                                                        attraction
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor={attraction}
                                                className="ml-2"
                                            >
                                                {attraction}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Danh sách phòng */}
                        <div className="col-span-3">
                            <div className="grid grid-cols-1 gap-5">
                                {searchResults.length > 0 ? (
                                    searchResults.map((room) => (
                                        <RoomTrip
                                            key={room.id}
                                            roomPhotoUrl={room.roomPhotoUrl}
                                            roomDescription={
                                                room.roomDescription
                                            }
                                            roomPlace={room.hotel?.name}
                                            roomType={room.roomType}
                                            roomPrice={room.roomPrice}
                                            hotelAddress={room.hotel?.address}
                                            hotelCity={room.hotel?.city}
                                        />
                                    ))
                                ) : rooms.length > 0 ? (
                                    rooms.map((room) => (
                                        <RoomTrip
                                            key={room.id}
                                            roomPhotoUrl={room.roomPhotoUrl}
                                            roomDescription={
                                                room.roomDescription
                                            }
                                            roomPlace={room.hotel?.name}
                                            roomType={room.roomType}
                                            roomPrice={room.roomPrice}
                                            hotelAddress={room.hotel?.address}
                                            hotelCity={room.hotel?.city}
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">
                                        Không tìm thấy phòng phù hợp. Vui lòng
                                        thử lại với thông tin khác.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Room;
