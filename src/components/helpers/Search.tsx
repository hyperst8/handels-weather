import "@/styles/search.scss";

import { ChangeEvent, KeyboardEvent } from "react";
import { optionType } from "../../types";

type SearchProps = {
  term: string;
  highlightedIndex: number;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOptionClick: (option: optionType) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const Search = ({
  term,
  highlightedIndex,
  options,
  onInputChange,
  handleOptionClick,
  handleKeyDown,
}: SearchProps): JSX.Element => {
  return (
    <div className="search-container">
      <input
        className="location-search"
        type="text"
        placeholder="Search location"
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        value={term}
      />

      {options.length > 0 && (
        <ul className="search-options">
          {options.map((option: optionType, index: number) => (
            <li
              key={index}
              className={highlightedIndex === index ? "highlighted" : ""}
              onClick={() => handleOptionClick(option)}
            >
              {option.name}, {option.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
