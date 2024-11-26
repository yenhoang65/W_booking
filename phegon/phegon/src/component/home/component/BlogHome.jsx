import { Link } from "react-router-dom";
import Blog from "../../common/Blog";

const BlogHome = () => {
  return (
    <section className="container mt-[100px]">
      <div className="flex justify-between items-center">
        <h1 className="text-[40px]  text-center font-bold  text-[#191B1D]">
          Latest travel diary
        </h1>
        <Link
          to=""
          className="text-white font-bold text-[18px]  bg-[#FF5B26]  px-[25px] py-[10px] rounded-full"
        >
          Read more
        </Link>
      </div>
      <div className=" grid grid-cols-[1.5fr_2.5fr] gap-[30px] mt-[70px]">
        <div className="h-auto">
          <div className="flex items-center justify-center">
            <img
              src="http://localhost:5173/image/blog.svg"
              alt=""
              className="h-[440px] w-[470px] rounded-[12px] object-cover "
            />
          </div>
          <h3 className="mt-[20px] text-[22px] leading-[28px] font-bold line-clamp-2">
            8 Amazing Places to Celebrate New Year 2023
          </h3>
          <p className="text-[#4E5358] leading-[28px] font-normal pt-[16px] line-clamp-3">
            Whether it’s champagne to ring in the New Year, a countdown party,
            or an intimate dinner, everyone plans something special. Whether
            it’s champagne to ring in the New...
          </p>
          <Link className="pt-4 text-[#FF5B26]">Learn more</Link>
        </div>
        <div >
          {[1, 2, 3].map((i) => (
            <Blog key={i} />
          ))}
        </div>
      </div>




    </section>
  );
};

export default BlogHome;
