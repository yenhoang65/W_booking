import authReducer from "./reducer/authReducer";
import bookingReducer from "./reducer/bookingReducer";
import contactReducer from "./reducer/contactReducer";
import hotelReducer from "./reducer/hotelReducer";
import roomReducer from "./reducer/roomReducer";

const rootReducer = {
    auth: authReducer,
    hotel: hotelReducer,
    room: roomReducer,
    booking: bookingReducer,
    contact: contactReducer,
};

export default rootReducer;
