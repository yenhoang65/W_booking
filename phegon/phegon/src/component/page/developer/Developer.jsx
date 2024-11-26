import image938 from "../../../../public/image/image 938.png";
import image936 from "../../../../public/image/image 936.png";
import image939 from "../../../../public/image/image 939.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearContactState,
    submitContactRequest,
} from "../../store/reducer/contactReducer";
function Developer() {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.contact);

    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitContactRequest({ message }));
    };

    useEffect(() => {
        if (success || error) {
            // Xử lý reset trạng thái sau khi gửi yêu cầu
            const timer = setTimeout(() => {
                dispatch(clearContactState());
                // setName("");
                // setEmail("");
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error, dispatch]);
    return (
        <>
            <div className="w-[1000px] m-auto flex justify-between">
                <div>
                    <img className="mt-[230px]" src={image938} alt="" />
                </div>

                <div className="w-full">
                    <img
                        className="relative mx-auto h-[200px] mt-[50px]"
                        src={image936}
                        alt=""
                    />
                    <h1 className="absolute top-[20rem] right-[540px] text-center text-[100px] leading-[80px] font-[700]">
                        Coming <br /> Soon
                    </h1>

                    <div className="mt-[170px] text-center">
                        <span>
                            Are you ready to get something new from us? Then
                            subscribe to the newsletter to get the latest
                            updates.
                        </span>
                    </div>

                    <div className="text-center mt-[20px] pb-[100px]">
                        <form onSubmit={handleSubmit}>
                            {/* <div>
                                <label>Tên:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div> */}
                            <div>
                                <label>Thông điệp:</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading}>
                                {loading ? "Đang gửi..." : "Gửi"}
                            </button>
                            {success && <p className="success">{success}</p>}
                            {error && <p className="error">{error}</p>}
                        </form>
                    </div>
                </div>
                <div>
                    <img className="mt-[260px]" src={image939} alt="" />
                </div>
            </div>
        </>
    );
}

export default Developer;
