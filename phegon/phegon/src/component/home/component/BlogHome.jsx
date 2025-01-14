import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../store/reducer/articleReducer"; // Import action
import Blog from "../../common/Blog";
import { Link } from "react-router-dom";

const BlogHome = () => {
    const dispatch = useDispatch();
    const { articles, loading, error } = useSelector((state) => state.article);

    // Gọi API khi component mount
    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const firstArticle = articles[0];
    const otherArticles = articles.slice(1, 4); // Lấy 3 bài viết sau

    return (
        <section className="container mt-[100px]">
            <div className="flex justify-between items-center">
                <h1 className="text-[40px] text-center font-bold text-[#191B1D]">
                    Latest travel diary
                </h1>
                <Link
                    to=""
                    className="text-white font-bold text-[18px] bg-[#FF5B26] px-[25px] py-[10px] rounded-full"
                >
                    Read more
                </Link>
            </div>

            <div className="grid grid-cols-[1.5fr_2.5fr] gap-[30px] mt-[70px]">
                {firstArticle && (
                    <div className="h-auto">
                        <div className="flex items-center justify-center">
                            <img
                                src={firstArticle.imageUrl}
                                alt={firstArticle.title}
                                className="h-[440px] w-[470px] rounded-[12px] object-cover"
                            />
                        </div>
                        <h3 className="mt-[20px] text-[22px] leading-[28px] font-bold line-clamp-2">
                            {firstArticle.title}
                        </h3>
                        <p className="text-[#4E5358] leading-[28px] font-normal pt-[16px] line-clamp-3">
                            {firstArticle.description}
                        </p>
                        <Link className="pt-4 text-[#FF5B26]">Learn more</Link>
                    </div>
                )}

                <div>
                    {otherArticles.map((article) => (
                        <Blog key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogHome;
