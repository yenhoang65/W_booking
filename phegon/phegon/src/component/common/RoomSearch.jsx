import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "../../service/ApiService";
import PropTypes from "prop-types";
//npm i react-date-range

const RoomSearch = ({ handleSearchResult }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomType, setRoomType] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState("");

    /**This methods is going to be used to show errors */
    const showError = (message, timeout = 5000) => {
        setError(message);
        setTimeout(() => {
            setError("");
        }, timeout);
    };

    return (
        <section>
            <div className=" m-auto mt-[40px] search-container">
                <div className="search-container flex gap-[6px] bg-[hsl(37,89%,67%)] py-1 px-1 rounded-md">
                    <div className="search-field bg-[#FFF] py-3 w-[348px] px-4 rounded-md shadow-search">
                        {/* <label className="font-bold  text-[#333] text-[17px] px-[5px]">
                            Check-in Date
                        </label>{" "} */}
                        {/* <br /> */}
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="outline-none px-3 py-1 border placeholder:text-[#333] w-[294px] cursor-pointer rounded-full placeholder:text-[14px]"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Check-in Date"
                        />
                    </div>
                    <div className="search-field bg-[#FFF] w-[348px] py-3 px-4 rounded-md shadow-search">
                        {/* <label className="font-bold text-[17px] text-[#333] px-[5px]">
                            Check-out Date
                        </label> */}
                        {/* <br /> */}
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className="outline-none px-3 py-1 border placeholder:text-[#333] w-[294px] cursor-pointer rounded-full placeholder:text-[14px]"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Check-out Date"
                        />
                    </div>
                    <div className="search-field bg-[#FFF] w-[348px] pt-3 px-4 flex flex-col rounded-md shadow-search">
                        {/* <label className="font-bold  text-[#333] text-[17px] px-[5px]">
                            Room Type
                        </label> */}
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            className="outline-none px-3 cursor-pointer py-[6px] rounded-full text-[15px] border text-[#333] "
                        >
                            <option disabled value="">
                                Select Room Type
                            </option>
                            {roomTypes.map((roomType) => (
                                <option key={roomType} value={roomType}>
                                    {roomType}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button className="bg-[#006ce4] mt-[px] rounded-md h-[57px] px-3 text-[20px] font-[500] text-[#FFF]">
                            search
                        </button>
                    </div>
                </div>
            </div>
            {error && <p className="error-message">{error}</p>}
        </section>
    );
};

RoomSearch.propTypes = {
    handleSearchResult: PropTypes.func.isRequired,
};

export default RoomSearch;
