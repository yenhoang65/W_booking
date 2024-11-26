import { Link } from "react-router-dom";
import a372051085 from "../../../../public/image/372051085.jpeg";

function Endow() {
    return (
        <>
            <div className="grid grid-cols-2 mt-6">
                <div className="bg-endow-image h-[200px] rounded-[10px] bg-cover">
                    <h3 className="text-white mt-6 ml-5 text-[20px] font-[600]">
                        Book now and get the discount right away
                    </h3>
                    <h3 className="text-white ml-5 mt-3 text-[15px] font-[600]">
                        Save 15% or more when booking and <br /> staying before
                        October 1, 2024
                    </h3>
                    <div className="mt-8">
                        <Link className="bg-[#0466c8] ml-5 p-3 text-[#FFF] font-[600] rounded-lg">
                            Find Seasonal Deals
                        </Link>
                    </div>
                </div>

                <div className="border border-[#838282] ml-5 rounded-[10px] flex justify-between">
                    <div className="ml-6 mt-6">
                        <h3 className="text-[18px] font-[600]">
                            Fun is key, it doesn't need to be long
                        </h3>
                        <h5 className="mt-3">
                            End the year with a short vacation. Save 15% <br />
                            or more when booking and staying until <br />
                            January 7, 2025.
                        </h5>
                        <div className="mt-4">
                            <Link className="bg-[#0466c8] p-3 text-[#FFF] font-[600] rounded-lg">
                                Find Year-End Deals
                            </Link>
                        </div>
                    </div>
                    <div>
                        <img
                            className="h-[150px] mt-6 mr-6 rounded-md"
                            src={a372051085}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Endow;
