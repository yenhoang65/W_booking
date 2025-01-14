// import { Link } from "react-router-dom";

// const Blog = () => {
//   return (
//     <div className="grid grid-cols-[1.5fr_2.5fr] gap-[30px]">
//       <div className="flex items-center justify-center">
//         <img
//           src="http://localhost:5173/image/blog.svg"
//           alt=""
//           className="h-[200px] object-cover rounded-[12px] w-[280px]"
//         />
//       </div>
//       <div className="flex flex-col justify-between">
//         <h3 className="mt-[20px] text-[22px] leading-[28px] font-bold line-clamp-2">
//           8 Amazing Places to Celebrate New Year 2023
//         </h3>
//         <p className="text-[#4E5358] leading-[28px] font-normal pt-[16px] line-clamp-3">
//           Whether it’s champagne to ring in the New Year, a countdown party, or
//           an intimate dinner, everyone plans something special. Whether it’s
//           champagne to ring in the New...
//         </p>
//         <Link className="pt-4 text-[#FF5B26]">Learn more</Link>
//       </div>
//     </div>
//   );
// };

// export default Blog;

import { Link } from "react-router-dom";

const Blog = ({ article }) => {
    if (!article) return null; // Tránh lỗi render nếu article là undefined

    return (
        <div className="grid grid-cols-[1.5fr_2.5fr] gap-[30px] pb-3">
            <div className="flex items-center justify-center">
                <img
                    src={article.imageUrl || "placeholder.jpg"} // Kiểm tra imageUrl
                    alt={article.title || "No title"}
                    className="h-[200px] object-cover rounded-[12px] w-[280px]"
                />
            </div>
            <div className="flex flex-col justify-between">
                <h3 className="mt-[20px] text-[22px] leading-[28px] font-bold line-clamp-2">
                    {article.title || "Untitled"}
                </h3>
                <p className="text-[#4E5358] leading-[28px] font-normal pt-[16px] line-clamp-3">
                    {article.description || "No description available."}
                </p>
                <Link className="pt-4 text-[#FF5B26]">Learn more</Link>
            </div>
        </div>
    );
};

export default Blog;
