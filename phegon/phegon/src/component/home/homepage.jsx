import { useState } from "react";
// import svg1 from "../../../public/image/vector 1.svg";
// import logo from "../../../public/image/logo.svg";
// import logo1 from "../../../public/image/logo1.svg";
// import logo2 from "../../../public/image/logo2.svg";
// import logo3 from "../../../public/image/logo3.svg";
// import logo4 from "../../../public/image/logo4.svg";

// import rectangle1 from "../../../public/image/Rectangle69.png";
// import rectangle2 from "../../../public/image/Rectangle70.png";
// import rectangle6121 from "../../../public/image/Rectangle6121.png";

// import RoomResult from "../common/RoomResult.jsx";
import RoomSearch from "../common/RoomSearch";
import Title from "../common/Title";
import Help from "./component/Help";
import Footer from "../common/footer";
import PopularTour from "./component/PopularTour";
import WhyTravelWithUs from "./component/WhyTravelWithUs";
import Discover from "./component/Discover";
import BlogHome from "./component/BlogHome";
import ShareYourLove from "./component/ShareYourLove";
import TravelMatter from "./component/TravelMatter";

import Endow from "./component/Endow";
import Favorite from "./component/Favorite";
import Header from "../common/header";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="home bg-cover">
            {/* <section className="relative bg-[#003b95] pt-[20px] pb-[30px] h-[330px] text-[#FFF] ">
                <div className="w-[1150px] m-auto flex flex-wrap gap-[30px] cursor-pointer">
                    <div className="flex gap-3 font-semibold items-center border px-4 py-2 rounded-full border-white">
                        <MdOutlineBedroomChild className="text-[20px]" /> Stay
                    </div>
                    <div className="flex gap-3 font-semibold items-center  px-4 py-2 rounded-full ">
                        <PiAirplaneInFlightFill className="text-[20px]" />
                        Flight
                    </div>
                    <div className="flex gap-3 font-semibold items-center  px-4 py-2 rounded-full ">
                        <GiWorld className="text-[20px]" /> Flight + Hotel
                    </div>
                    <div className="flex gap-3 font-semibold items-center  px-4 py-2 rounded-full ">
                        <FaCar className="text-[20px]" /> Car rental
                    </div>
                    <div className="flex gap-3 font-semibold items-center  px-4 py-2 rounded-full ">
                        <FaMapLocationDot className="text-20px]" /> Place to
                        visit
                    </div>

                    <div className="flex gap-3 font-semibold items-center  px-4 py-2 rounded-full ">
                        <FaTaxi className="text-[20px]" /> Taxi
                    </div>
                </div>

                <div className="py-[64px] w-[1150px] m-auto ">
                    <h3 className="text-[48px] font-[700]">
                        Find your next property
                    </h3>
                    <p className="text-[24px] pt-4">
                        Find hotel deals, home stays and more...
                    </p>
                </div>

                <div className="absolute left-[180px] -bottom-[40px]">
                    <RoomSearch handleSearchResult={handleSearchResult} />
                </div>
            </section> */}
            <Header />
            <div className="bg-[#003b95]">
                <div className="pb-10 text-[#fff] w-[1150px] m-auto ">
                    <h3 className="text-[48px] font-[700]">
                        Find your next property
                    </h3>
                    <p className="text-[24px] pt-4">
                        Find hotel deals, home stays and more...
                    </p>
                </div>
            </div>
            <section className="w-[1150px] m-auto mt-[100px] pb-[40px]">
                <Title title="Endow" desc="" />

                <Endow />
            </section>

            <Favorite />

            {/* AVAILABLE ROOMS SECTION */}
            <PopularTour />

            <WhyTravelWithUs />

            <Discover />

            <BlogHome />

            {/* <ShareYourLove /> */}

            <TravelMatter />

            <Footer />
        </div>
    );
};

export default HomePage;
