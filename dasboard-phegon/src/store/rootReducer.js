import authReducer from "./reducer/authReducer";
import bookingReducer from "./reducer/bookingReducer";
import contactReducer from "./reducer/contactReducer";
import hotelReducer from "./reducer/hotelReducer";
import roomReducer from "./reducer/roomReducer";
import dashboardReducer from "./reducer/dashboardReducer";
const rootReducer = {
    auth: authReducer,
    hotel: hotelReducer,
    room: roomReducer,
    booking: bookingReducer,
    contact: contactReducer,
    dashboard: dashboardReducer,
};

export default rootReducer;
