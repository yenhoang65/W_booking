import { Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SockJS from "sockjs-client";
import { GoPaperAirplane } from "react-icons/go";
// import Stomp from "stompjs";

const Chat = ({ userName, onLogout }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]); // Lưu tin nhắn
    const stompClientRef = useRef(null); // Tham chiếu đến STOMP client
    const inputRef = useRef(null); // Tham chiếu đến ô input
    const messagesEndRef = useRef(null); // Cuộn xuống tin nhắn cuối cùng

    const handleKeyDown = (e) => {
        // if (e.key === "Enter") {
        // }
    };

    const handleLogout = () => {
        onLogout();
    };

    const sendMessage = () => {
        // 'sendMessage' is assigned a value but never used.
        if (stompClient && message.trim() !== "") {
            const chatMessage = {
                sender: userName,
                content: message,
                type: "CHAT",
            };
            stompClient.send(
                "/app/sendMessage",
                {},
                JSON.stringify(chatMessage)
            );
            setMessage("");
            inputRef.current?.focus();
        }
    };

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/chat-websocket");
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        stompClient.connect({}, () => {
            console.log("Connected to WebSocket");

            // Gửi sự kiện join khi kết nối thành công
            stompClient.send("/app/join", {}, JSON.stringify(userName));

            // Đăng ký nhận tin nhắn từ server
            stompClient.subscribe("/topic/messages", (messageOutput) => {
                const receivedMessage = JSON.parse(messageOutput.body);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    receivedMessage,
                ]);
            });
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
                console.log("Disconnected from WebSocket");
            }
        };
    }, [userName]);

    // Cuộn xuống tin nhắn mới nhất
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Gửi tin nhắn
    // const sendMessage = () => {
    //     if (message.trim() && stompClientRef.current) {
    //         stompClientRef.current.send(
    //             "/app/sendMessage",
    //             {},
    //             JSON.stringify({ sender: userName, content: message })
    //         );
    //         setMessage("");
    //     }
    // };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col bg-white rounded-xl shadow-lg w-full sm:w-[29rem] h-[700px]">
                {/* Header */}
                <div className="p-4 bg-blue-500 text-white font-semibold text-center rounded-t-xl">
                    Chat Room
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 rounded-b-xl space-y-4">
                    {messages.map((message, index) => (
                        <div key={index}>
                            {message.type === "JOIN" ? (
                                <div className="text-center text-green-500 italic">
                                    {message.sender} đã tham gia phòng chat.
                                </div>
                            ) : message.type === "LEAVE" ? (
                                <div className="text-center text-red-500 italic">
                                    {message.sender} đã rời phòng chat.
                                </div>
                            ) : (
                                <Message
                                    sender={message.sender}
                                    content={message.content}
                                    isOwnMessage={message.sender === userName}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 bg-gray-50 rounded-b-xl">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            className="flex-1 p-3 border-gray-300 rounded-full focus:outline-none focus:ring-2 
                        focus:ring-blue-300 focus:border-blue-300 transition duration-300"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={sendMessage}
                            className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
                        >
                            <GoPaperAirplane />
                        </button>
                    </div>
                </div>
                {/* Button logout */}
                <div className="p-4 text-center border-t bg-gray-50">
                    <button
                        onClick={handleLogout} // Lỗi: handleLogout chưa được định nghĩa
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
