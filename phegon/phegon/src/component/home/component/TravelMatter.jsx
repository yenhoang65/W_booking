import { Link } from "react-router-dom";

const TravelMatter = () => {
  return (
    <section className="bg-[#1EB482]">
      <div className="container relative">
        <img
          src="http://localhost:5173/image/map.svg"
          alt=""
          className="absolute top-0 left-0 w-full h-full"
        />

        <div className="grid grid-cols-3 py-[100px]">
          <div className="col-span-1 flex justify-center items-center">
            <img
              src="http://localhost:5173/image/matter.svg"
              alt=""
              className="w-[300px] h-[300px] object-cover rounded-full"
            />
          </div>
          <div className="col-span-2 text-white flex justify-between gap-[20px] items-center">
            <div >
              <span className="text-[52px] leading-[56px] font-bold">Travel matter</span>
              <p className="text-[18px] leading-[30px] w-[570px] font-normal pt-1">
                We believe sustainable tourism matters. MAKE TRAVEL MATTER® is
                our commitment to preserving the planet.
              </p>
            </div>
            <Link className="text-[18px] bg-[#FFC200] px-5 font-medium py-2 rounded-full text-black">Find Destination</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelMatter;
