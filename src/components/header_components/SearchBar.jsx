import { useState } from "react";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="포켓몬 검색..."
      value={keyword}
      onChange={handleChange}
      className="w-full mb-4 p-2 border border-gray-300 rounded"
    />
  );
}

export default SearchBar;
