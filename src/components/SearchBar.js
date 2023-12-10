import "./SearchBar.css";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SearchBar = () => {
  const [searchInput, setInputSearch] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInputSearch(e.target.value);
  };

  //   if (searchInput.length > 0) {
  //     countries.filter((country) => {
  //       return country.name.match(searchInput);
  //     });
  //   }
  return (
    <div className="searchWrapper" style={{ display: "none" }}>
      <input
        className="searchInput"
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <FontAwesomeIcon className="searchIcon" icon={faSearch} />
    </div>
  );
};

export default SearchBar;
