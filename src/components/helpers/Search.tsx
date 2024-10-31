import "@/styles/search.scss";

import { ChangeEvent } from "react";
import { optionType } from "../../types";
import { PiMagnifyingGlassBold } from "react-icons/pi";

type SearchProps = {
	term: string;
	options: [];
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onOptionSelect: (option: optionType) => void;
	onSubmit: () => void;
};

const Search = ({
	term,
	options,
	onInputChange,
	onOptionSelect,
	onSubmit,
}: SearchProps): JSX.Element => {
	return (
		<div className="search-container">
			<input
				className="location-search"
				type="text"
				placeholder="Search location"
				onChange={onInputChange}
			/>
			<button className={`search-btn ${term.length >= 2 ? "active" : ""}`}>
				<PiMagnifyingGlassBold className="search-icon" onClick={onSubmit} />
			</button>
			{options.length > 0 && (
				<ul className="search-options">
					{options.map((option: optionType, index: number) => (
						<li key={index} onClick={() => onOptionSelect(option)}>
							<button>
								{option.name}, {option.country}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Search;
