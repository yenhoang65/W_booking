import Title from "../../common/Title";
import Trip from "../../common/Trip";
import Carousel from "react-multi-carousel";
import { responsive } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoomTop5 } from "../../store/reducer/roomReducer";

const Favorite = () => {
    const dispatch = useDispatch();
    const { topRooms, loading, error } = useSelector((state) => state.room);

    useEffect(() => {
        dispatch(getRoomTop5()); // Gọi API lấy top 5 rooms
    }, [dispatch]);

    // Loading và Error UI
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
                    {/* Render Top 5 Rooms */}
                    {topRooms &&
                        topRooms.map((room) => (
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
            </div>
        </section>
    );
};

export default Favorite;
