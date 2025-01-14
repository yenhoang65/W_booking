import { useState } from "react";
import api from "../../service/ApiService";
import { HiMail } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";
import { MdOutlinePassword } from "react-icons/md";
import { AiOutlineKey } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const ResetPasswordPage = () => {
    const [step, setStep] = useState(1); // Bước hiện tại
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleSendOtp = async () => {
        try {
            const response = await api.post("/auth/forgot-password", null, {
                params: { email },
            });
            console.log(response.data);

            const generatedOtp = generateOtp();
            localStorage.setItem("otp", generatedOtp);

            await api.post("/auth/send-email", null, {
                params: {
                    email,
                    subject: "Mã OTP của bạn",
                    body: `Mã OTP của bạn là: ${generatedOtp}. Mã này có hiệu lực trong 5 phút.`,
                },
            });

            setMessage("OTP has been sent to your email.");
            setError("");
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || "Có lỗi xảy ra!");
        }
    };

    const handleVerifyOtp = () => {
        const storedOtp = localStorage.getItem("otp");
        if (storedOtp === otp) {
            setMessage("OTP is valid, you can reset your password.");
            setError("");
            setStep(3);
        } else {
            setError("OTP không hợp lệ hoặc đã hết hạn.");
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await api.post("/auth/reset-password", null, {
                params: { email, newPassword, confirmPassword },
            });
            setMessage(response.data.message);
            setError("");

            localStorage.removeItem("otp");
            setStep(4);
        } catch (err) {
            setError(err.response?.data?.message || "Có lỗi xảy ra!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-700 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-3 ml-5">
                        <div className="w-12 h-12 bg-blue-600  rounded-full flex items-center justify-center">
                            <span
                                className="text-3xl font-bold  text-[#fff] cursor-pointer"
                                onClick={() => navigate("/")}
                            >
                                P
                            </span>
                        </div>
                        <span
                            className="text-blue-600 text-2xl cursor-pointer font-bold"
                            onClick={() => navigate("/")}
                        >
                            hegon
                        </span>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    {step === 1 && "Forgot password"}
                    {step === 2 && "OTP authentication"}
                    {step === 3 && "Reset password"}
                    {step === 4 && "Completed"}
                </h2>

                {message && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiMail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-4 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#003399] transition duration-200"
                            />
                        </div>
                        <div className="text-right">
                            <a
                                href="/login"
                                className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200"
                            >
                                Sign-in?
                            </a>
                        </div>
                        <button
                            onClick={handleSendOtp}
                            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-[#002277] transition duration-200"
                        >
                            Gửi mã OTP
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <AiOutlineKey className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Nhập mã OTP"
                                className="w-full pl-10 pr-4 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#003399] transition duration-200"
                            />
                        </div>
                        <button
                            onClick={handleVerifyOtp}
                            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-[#002277] transition duration-200"
                        >
                            Xác nhận OTP
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <BiLockAlt className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter a new password"
                                className="w-full pl-10 pr-4 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#003399] transition duration-200"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MdOutlinePassword className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm new password"
                                className="w-full pl-10 pr-4 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#003399] transition duration-200"
                            />
                        </div>
                        <button
                            onClick={handleResetPassword}
                            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-[#002277] transition duration-200"
                        >
                            Reset password
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div className="text-center">
                        <div className="mb-4">
                            <svg
                                className="w-16 h-16 text-green-500 mx-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <p className="text-lg text-gray-700 font-medium">
                            Reset password successfully!
                        </p>
                        <p className="text-gray-500 mt-2">
                            Please log in again with new password.
                        </p>
                        <a
                            href="/login"
                            className="mt-6 inline-block px-6 py-3 bg-[#003399] text-white rounded-lg font-medium hover:bg-[#002277] transition duration-200"
                        >
                            Login
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
