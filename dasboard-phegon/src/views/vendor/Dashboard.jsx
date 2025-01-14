import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../store/reducer/dashboardReducer";
import {
    ArrowTrendingUpIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    ClockIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    if (loading)
        return (
            <p className="text-center text-gray-500 animate-pulse">
                Loading...
            </p>
        );
    if (error)
        return (
            <p className="text-center text-red-500 animate-bounce">
                Error: {error}
            </p>
        );
    if (!data) return null;

    const {
        totalHotels,
        totalRooms,
        roomStatistics,
        revenuePerHotel,
        totalRevenueAllHotels,
    } = data;

    // Dữ liệu cho biểu đồ hình tròn
    const pieData = {
        labels: Object.keys(revenuePerHotel),
        datasets: [
            {
                label: "Doanh Thu (VND)",
                data: Object.values(revenuePerHotel),
                backgroundColor: [
                    "#4caf50",
                    "#2196f3",
                    "#ff9800",
                    "#f44336",
                    "#9c27b0",
                ],
                borderColor: ["#ffffff"],
                borderWidth: 2,
            },
        ],
    };

    const pieOptions = {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="p-8 bg-gray-100 animate-fade-in">
            {/* Tổng quan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Tổng khách sạn */}
                <div className="bg-white shadow-md p-6 rounded-lg flex items-center transform hover:scale-105 transition-transform duration-300">
                    <BuildingOfficeIcon className="h-12 w-12 text-blue-500 mr-4 animate-spin" />
                    <div>
                        <h3 className="text-gray-600 text-sm uppercase">
                            Tổng Khách Sạn
                        </h3>
                        <p className="text-2xl font-bold">{totalHotels}</p>
                    </div>
                </div>

                {/* Tổng số phòng */}
                <div className="bg-white shadow-md p-6 rounded-lg flex items-center transform hover:scale-105 transition-transform duration-300">
                    <ArrowTrendingUpIcon className="h-12 w-12 text-green-500 mr-4 animate-bounce" />
                    <div>
                        <h3 className="text-gray-600 text-sm uppercase">
                            Tổng Số Phòng
                        </h3>
                        <p className="text-2xl font-bold">{totalRooms}</p>
                    </div>
                </div>

                {/* Tổng doanh thu */}
                <div className="bg-white shadow-md p-6 rounded-lg flex items-center transform hover:scale-105 transition-transform duration-300">
                    <ArrowTrendingUpIcon className="h-12 w-12 text-yellow-500 mr-4 animate-pulse" />
                    <div>
                        <h3 className="text-gray-600 text-sm uppercase">
                            Tổng Doanh Thu Tháng
                        </h3>
                        <p className="text-2xl font-bold text-gray-800">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(totalRevenueAllHotels)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Biểu đồ hình tròn */}
            <h2 className="text-xl font-semibold mt-8 mb-4">
                Thống Kê Doanh Thu
            </h2>
            <div
                className="bg-white shadow-md rounded-lg p-6 mb-8"
                style={{ height: "400px" }}
            >
                <Pie data={pieData} options={pieOptions} />
            </div>

            {/* Danh sách khách sạn */}
            <h2 className="text-xl font-semibold mb-4">Chi Tiết Khách Sạn</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(roomStatistics).map(([hotelName, stats]) => (
                    <div
                        key={hotelName}
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
                    >
                        <div className="flex items-center mb-4">
                            <CheckCircleIcon className="h-8 w-8 text-green-500 mr-2 animate-pulse" />
                            <h3 className="text-lg font-bold text-gray-800">
                                {hotelName}
                            </h3>
                        </div>
                        <p className="text-gray-600 flex items-center">
                            <ClockIcon className="h-5 w-5 text-blue-400 mr-2" />{" "}
                            Tổng Phòng: {stats.totalRooms}
                        </p>
                        <p className="text-gray-600 flex items-center">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-400 mr-2" />{" "}
                            Phòng Đang Thuê: {stats.bookedRooms}
                        </p>
                        <p className="text-gray-600 flex items-center">
                            <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />{" "}
                            Phòng Trống: {stats.availableRooms}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
