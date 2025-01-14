const DiscoverComponent = ({ name, address, photo }) => {
    return (
        <div className="relative z-10">
            <img
                src={photo}
                alt=""
                className="w-[370px] h-[370px] object-cover rounded-[12px] flex justify-center"
            />
            <div className="bg-white rounded-[12px] p-[20px] absolute -bottom-16 left-4 w-[330px] shadow-search">
                <span className="leading-[28px] font-[400] text-[#4E5358]">
                    {name}
                </span>
                <h3 className="text-[22px] leading-[28px] font-bold pt-1">
                    {address}
                </h3>
                <div className="flex items-center gap-[10px] pt-1">
                    <img src="http://localhost:5173/image/star.svg" alt="" />
                    5.0 Ratings
                </div>
            </div>
        </div>
    );
};

export default DiscoverComponent;
