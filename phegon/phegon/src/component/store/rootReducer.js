import authReducer from "./reducer/authReducer";
import bookingReducer from "./reducer/bookingReducer";
import hotelReducer from "./reducer/hotelReducer";
import roomReducer from "./reducer/roomReducer";
import emailReducer from "./reducer/emailReducer";
import contactReducer from "./reducer/contactReducer";
import articleReducer from "./reducer/articleReducer";

const rootReducer = {
    auth: authReducer,
    room: roomReducer,
    hotel: hotelReducer,
    booking: bookingReducer,
    email: emailReducer,
    contact: contactReducer,
    article: articleReducer,
};

export default rootReducer;
