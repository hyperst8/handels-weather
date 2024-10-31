import "@/styles/search.scss";

import { ChangeEvent, useState } from "react";
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
	const [disabled, setDisabled] = useState<boolean>(true); // disabled search button if option not selected

	return (
		<div className="search-container">
			<input
				className="location-search"
				type="text"
				placeholder="Search location"
				onChange={onInputChange}
				value={term}
			/>
			<button
				className={`search-btn ${term.length >= 2 ? "active" : ""}`}
				disabled={disabled}
			>
				<PiMagnifyingGlassBold className="search-icon" onClick={onSubmit} />
			</button>
			{options.length > 0 && (
				<ul className="search-options">
					{options.map((option: optionType, index: number) => (
						<li
							key={index}
							onClick={() => {
								onOptionSelect(option);
								setDisabled(false);
							}}
						>
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
