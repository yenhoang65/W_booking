import PropTypes from "prop-types";

const Search = ({ setParPage, searchValue, setSearchValue }) => {
    return (
        <div className="flex justify-between items-center">
            <select
                onChange={(e) => setParPage(parseInt(e.target.value))}
                className="px-4 py-2 hover:border-indigo-500 outline-none bg-[#153243] border border-slate-700 rounded-md text-white"
                name=""
                id=""
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <input
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-white"
                type="text"
                name="search"
                id=""
                placeholder="Search..."
            />
        </div>
    );
};

Search.propTypes = {
    setParPage: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
};

export default Search;
