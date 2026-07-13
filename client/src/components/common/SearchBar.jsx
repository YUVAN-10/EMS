import { useState, useCallback } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { debounce } from "../../utils/helpers";
import "./SearchBar.css";

/**
 * Search bar with icon, debounced input, and clear button.
 *
 * Props:
 *   onSearch   — callback fired with the search term after debounce
 *   placeholder — input placeholder text
 */
const SearchBar = ({ onSearch, placeholder = "Search employees by name..." }) => {
  const [value, setValue] = useState("");

  // Debounce the search callback to avoid excessive API calls
  const debouncedSearch = useCallback(
    debounce((term) => onSearch(term), 400),
    [onSearch]
  );

  const handleChange = (e) => {
    const term = e.target.value;
    setValue(term);
    debouncedSearch(term);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <FiSearch className="search-bar__icon" />
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        id="search-employees"
      />
      {value && (
        <button className="search-bar__clear" onClick={handleClear} aria-label="Clear search">
          <FiX />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
