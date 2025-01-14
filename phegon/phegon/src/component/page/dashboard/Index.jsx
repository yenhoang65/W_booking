import api from "../../../service/ApiService";
import { useEffect, useState } from "react";

const MyOrdersPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get("/users/my-bookings", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                setBookings(response.data.bookingList || []);
                setError("");
            } catch (err) {
                setError(err.response?.data?.message || "Có lỗi xảy ra!");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Đang tải...</p>;
    }

    if (error) {
        return <p className="text-red-600 text-center mt-10">{error}</p>;
    }

    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Danh sách đơn đặt phòng
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-white rounded-lg p-4 hover:shadow-lg transition duration-300"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-blue-700">
                            {booking.hotel.name}
                        </h2>
                        <img
                            src={booking.hotel.photo}
                            alt="Hotel"
                            className="rounded-lg w-full h-40 object-cover mb-4"
                        />
                        <p className="text-gray-600 mb-1">
                            Ngày nhận phòng: {booking.checkInDate}
                        </p>
                        <p className="text-gray-600 mb-1">
                            Ngày trả phòng: {booking.checkOutDate}
                        </p>
                        <p className="text-gray-800 font-semibold mb-2">
                            Tổng tiền:{" "}
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(booking.totalPrice)}
                        </p>
                        <button
                            onClick={() => setSelectedBooking(booking)}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Xem chi tiết
                        </button>
                    </div>
                ))}
            </div>

            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setSelectedBooking(null)}
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-bold mb-4">
                            Chi tiết đơn đặt phòng
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Khách sạn
                                </h3>
                                <p className="text-gray-600">
                                    Tên: {selectedBooking.hotel.name}
                                </p>
                                <p className="text-gray-600">
                                    Địa chỉ: {selectedBooking.hotel.address}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Phòng</h3>
                                <p className="text-gray-600">
                                    Loại phòng: {selectedBooking.room.roomType}
                                </p>
                                <p className="text-gray-600">
                                    Giá phòng:{" "}
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(selectedBooking.room.roomPrice)}
                                </p>
                            </div>
                        </div>
                        <img
                            src={selectedBooking.room.roomPhotoUrl}
                            alt="Room"
                            className="rounded-lg w-full h-60 object-cover mt-4 mb-4"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">
                                Thông tin đặt phòng
                            </h3>
                            <p className="text-gray-600">
                                Ngày nhận phòng: {selectedBooking.checkInDate}
                            </p>
                            <p className="text-gray-600">
                                Ngày trả phòng: {selectedBooking.checkOutDate}
                            </p>
                            <p className="text-gray-800 font-semibold">
                                Tổng tiền:{" "}
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(selectedBooking.totalPrice)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrdersPage;
