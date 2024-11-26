const ShareYourLove = () => {
  return (
    <div className="container mt-[100px] mb-[40px]">
      <div className="flex justify-center">
        <h1 className="text-[40px] w-[380px] text-center font-bold text-[#191B1D]">
          Share Your Love
        </h1>
      </div>

      <div className="grid grid-rows-[auto_auto_auto] grid-cols-[2fr_1.7fr_1.5fr] gap-[20px] mt-[70px]">
        <div className=" rounded-lg overflow-hidden">
          <img
            src="http://localhost:5173/image/blog.svg"
            alt=""
            className="object-cover w-full h-[470px]"
          />
        </div>
        <div className=" rounded-lg overflow-hidden">
          <img
            src="http://localhost:5173/image/blog.svg"
            alt=""
            className="object-cover w-full h-[470px]"
          />
        </div>
        <div className=" rounded-lg overflow-hidden">
          <img
            src="http://localhost:5173/image/blog.svg"
            alt=""
            className="object-cover w-full h-[470px]"
          />
        </div>
        <div className="col-span-2  rounded-lg overflow-hidden">
          <img
            src="http://localhost:5173/image/blog.svg"
            alt=""
            className="object-cover w-full h-[470px]"
          />
        </div>
        <div className=" rounded-lg overflow-hidden">
          <img
            src="http://localhost:5173/image/blog.svg"
            alt=""
            className="object-cover w-full h-[470px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ShareYourLove;
