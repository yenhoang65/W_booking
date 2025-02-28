import Footer from "../../common/footer";
import { IoMdSearch } from "react-icons/io";
import HotelTrip from "./HotelTrip";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsAll } from "../../store/reducer/hotelReducer";
import { useEffect } from "react";
import Header from "../../common/header";

function Hotel() {
    const dispatch = useDispatch();
    const { hotels } = useSelector((state) => state.hotel);

    useEffect(() => {
        dispatch(getHotelsAll());
    }, []);
    return (
        <>
            <Header />

            <div className="m-auto w-[1150px]">
                <div className="flex justify-center mt-[30px] py-4">
                    <div className="relative w-[500px]">
                        <h1 className="text-center pb-[20px]">
                            We have more than 1000+ destinations you can choose
                        </h1>
                        <input
                            className="px-5 py-2 w-full outline-none border bg-transparent border-slate-700 rounded-full text-black focus:border-red-500"
                            type="text"
                            name="search"
                            placeholder="Search..."
                        />
                        <button className=" rounded-full py-[6px] px-[20px] absolute right-0 top-1/2 mt-[22px] transform -translate-y-1/2 bg-[#FF5B26] border-none text-[#FFF]">
                            <IoMdSearch className="text-[30px]" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-center gap-8  text-center py-4">
                    <div className="px-3 py-2 rounded-full cursor-pointer w-[100px] border hover:bg-orange-500 hover:text-white text-black font-[600]">
                        <Link to="" className="">
                            Popular
                        </Link>
                    </div>

                    <div className="px-3 py-2 rounded-full cursor-pointer w-[100px] border hover:bg-orange-500 hover:text-white text-black font-[600]">
                        <Link to="" className="">
                            Regions
                        </Link>
                    </div>
                    <div className="px-3 py-2 rounded-full cursor-pointer w-[100px] border hover:bg-orange-500 hover:text-white text-black font-[600]">
                        <Link to="" className="">
                            Countries
                        </Link>
                    </div>
                    <div className="px-3 py-2 rounded-full cursor-pointer w-[100px] border hover:bg-orange-500 hover:text-white text-black font-[600]">
                        <Link to="" className="">
                            Cities
                        </Link>
                    </div>
                </div>

                <section className=" mb-[100px]">
                    <div className="grid grid-cols-3 gap-5 mt-[30px]">
                        {/* {[1, 2, 3, 4, 5, 6].map((i) => (
                            <HotelTrip key={i} />
                        ))} */}
                        {hotels.map((hotel) => (
                            <HotelTrip
                                key={hotel.i}
                                address={hotel.address}
                                // name={hotel.name}
                                photo={hotel.photo}
                            />
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Hotel;
