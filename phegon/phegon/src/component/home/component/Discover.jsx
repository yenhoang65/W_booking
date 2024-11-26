import Carousel from "react-multi-carousel";
import DiscoverComponent from "../../common/DiscoverComponent";
import { responsive, responsive3 } from "../../../utils/utils";
import PropTypes from "prop-types";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHotelsAll } from "../../store/reducer/hotelReducer";
import { Link } from "react-router-dom";

const Discover = () => {
    const dispatch = useDispatch();
    const { hotels } = useSelector((state) => state.hotel);

    useEffect(() => {
        dispatch(getHotelsAll());
    }, []);
    const ButtonGroup = ({ next, previous }) => {
        return (
            <div className="absolute top-0 left-0 right-0 grid grid-cols-2 px-4 py-2  bg-white z-10">
                <div className="text-[52px] leading-[56px] font-bold text-[#191B1D]">
                    Discover your next destination
                </div>
                <div className="flex justify-end items-center gap-3 text-[#FF5B26]">
                    <button
                        onClick={() => previous()}
                        className="w-[30px] h-[30px] flex justify-center items-center bg-white border rounded-full border-black"
                    >
                        <HiArrowSmLeft />
                    </button>
                    <button
                        onClick={() => next()}
                        className="w-[30px] h-[30px] flex justify-center items-center bg-white border rounded-full border-black"
                    >
                        <HiArrowSmRight />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section className="container mt-[150px] mb-[90px] relative">
            {/* ButtonGroup o vi tri tren */}
            <Carousel
                autoPlay={false}
                infinite={false}
                arrows={false}
                responsive={responsive3}
                transitionDuration={500}
                renderButtonGroupOutside={true}
                itemClass="overflow-visible pb-[100px] pt-[150px] px-2"
                customButtonGroup={<ButtonGroup />}
            >
                {hotels.map((hotel) => (
                    <DiscoverComponent
                        key={hotel.i}
                        address={hotel.address}
                        name={hotel.name}
                        photo={hotel.photo}
                    />
                ))}
            </Carousel>

            <div className="flex justify-center">
                <Link
                    to="/hotel"
                    className="border px-6 py-2 rounded-full bg-[#FF5B26] text-[#FFF] font-[600]"
                >
                    HotelAll
                </Link>
            </div>
        </section>
    );
};

Discover.propTypes = {
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
};

export default Discover;
