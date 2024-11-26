import ct from "../../../public/image/ct.jpg";

const Footer = () => {
    return (
        <footer>
            <div className="footer bg-[#FFF9E5] ">
                <div className=" w-[1200px] h-[300px] m-auto flex gap-[180px] pt-[20px] pb-[20px]">
                    <div className="f1 ">
                        <h6 className="font-bold text-[20px]">Booking</h6>
                        <div className="pt-[10px] leading-[35px]">
                            <p>My Booking</p>
                            <p>Submit Trip Feedback</p>
                            <p>Safe Travels Hub</p>
                            <p>Travel Alerts</p>
                            <p>Vaccinations & Testing</p>
                            <p>Flexible Booking</p>
                        </div>
                    </div>
                    <div className="f1 ">
                        <h6 className="font-bold text-[20px]">Company</h6>
                        <div className="pt-[10px] leading-[35px]">
                            <p>About us</p>
                            <p>News & Blog</p>
                            <p>Press Center</p>
                            <p>Investors</p>
                            <p>Suppliers</p>
                        </div>
                    </div>

                    <div className="f1 ">
                        <h6 className="font-bold text-[20px]">Contact</h6>
                        <div className="pt-[10px] leading-[35px]">
                            <p>Get In Touch</p>
                            <p>Live Chat</p>
                            <p>FAQ</p>
                            <p>Testimonials</p>
                        </div>
                    </div>
                    <div className="f1 ">
                        <h6 className="font-bold text-[20px]">
                            Subscribe our newsletter
                        </h6>
                        <div className="pt-[10px] leading-[35px]">
                            <div className="flex">
                                <input
                                    className="outline-none pl-[20px] rounded-[999px] bg-[#FFF9E5] border border-[#4E5358] text-[14px] placeholder:text-black "
                                    placeholder="Enter your email"
                                    type="text"
                                />
                                <button className="pl-[20px] pr-[20px] border ml-[10px] rounded-[999px] bg-[#FF5B26] text-[#FFF]">
                                    Subject
                                </button>
                            </div>

                            <p className="mt-[20px] font-bold text-[17px] pl-[5px]">
                                Flow Us
                            </p>

                            <img className="h-[40px]" src={ct} alt="" />
                        </div>
                    </div>
                </div>

                <div className="my-footer w-[1200px] h-[60px] m-auto text-center border-t-2">
                    <p className="mt-[15px]">
                        Phegon Hotel | All Right Reserved &copy;{" "}
                        {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
