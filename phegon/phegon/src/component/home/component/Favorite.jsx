import { Link } from "react-router-dom";
import Title from "../../common/Title";
import Trip from "../../common/Trip";
import Carousel from "react-multi-carousel";
import { responsive } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoomAll } from "../../store/reducer/roomReducer";
// import { useSelector } from "react-redux";

const Favorite = () => {
    const dispatch = useDispatch();
    const { rooms } = useSelector((state) => state.room);

    useEffect(() => {
        dispatch(getRoomAll());
    }, []);

    return (
        <section className="w-[1200px] m-auto mt-[10px] mb-[100px]">
            <Title
                title="Favorite Rooms"
                desc={
                    "Create a fully customized day-by-day itinerary for free. Imagine checking one place for your travel."
                }
            />
            <div className="mt-[70px]">
                <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    arrows={true}
                    transitionDuration={500}
                    itemClass="mx-2.5 pb-[30px]"
                >
                    {/* {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <Trip key={i} />
                    ))} */}

                    {rooms.map((room) => (
                        <Trip
                            key={room.id}
                            roomId={room.id}
                            roomPhotoUrl={room.roomPhotoUrl}
                            roomDescription={room.roomDescription}
                            roomType={room.roomType}
                            roomPrice={room.roomPrice}
                            roomPlace={room.hotel?.name}
                        />
                    ))}
                </Carousel>

                {/* <div className=" flex justify-center items-center cursor-pointer">
                    <Link
                        to="/room"
                        className="text-white font-bold text-[18px] mt-[55px] bg-[#FF5B26]  px-[25px] py-[10px] rounded-full"
                    >
                        View All Trips
                    </Link>
                </div> */}
            </div>
        </section>
    );
};

export default Favorite;
