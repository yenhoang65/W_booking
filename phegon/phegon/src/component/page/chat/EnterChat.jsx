import React, { useState } from "react";
import { HiChatBubbleLeft } from "react-icons/hi2";

const EnterChat = ({ onJoin }) => {
    const [userName, setUserName] = useState("");

    const handleJoin = () => {
        if (userName.trim()) {
            onJoin(userName); // Gửi username lên App
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && userName.trim()) {
            handleJoin();
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-xl w-full sm:w-96">
                <h1 className="text-1xl font-semibold text-center mb-6 flex items-center justify-center space-x-2">
                    <HiChatBubbleLeft />
                    <span className="text-xl">Welcome to the chat world!</span>
                </h1>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
                <button
                    onClick={handleJoin}
                    disabled={!userName.trim()}
                    className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                >
                    Join Chat
                </button>
            </div>
        </div>
    );
};

export default EnterChat;
