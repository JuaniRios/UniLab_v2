import React, {useEffect, useState} from "react";
// STYLES
import "./Search.css";

import search_img from "../../Assets/img/top-nav/search.png";
import CloseButton from "../Buttons/CloseButton";
import apiCall from "../HelperFunctions/apiCall";
import { useAuthState } from "../../Context";
import SearchResult from "./SearchResult";

export default function Search(props) {
	const { token, userData } = useAuthState();
	const [searchString, setSearchString] = useState("");
	const [page, setPage] = useState(1);
	const [results, setResults] = useState([]);
	const searchType = props.searchType;
	const width = props.width;
	const [searchState, setSearchState] = useState("hidden");
	const [searchFieldState, setSearchFieldState] = useState("search-input-field-closed");
	function toggleSearch() {
		if (searchState === "hidden") {
			setSearchState("shown");
			setTimeout(() => {
				setSearchFieldState("search-input-field-opened");
			}, 250);
		} else {
			setSearchFieldState("search-input-field-closed");
			setTimeout(() => {
				setSearchState("hidden");
			}, 250);
		}
	}
	function escFunction(event) {
		if (event.key === "Escape" && searchState === "shown") {
			toggleSearch();
		}
	}
	document.addEventListener("keydown", escFunction, false);

	async function getResults() {
		if (searchString.length <= 0) {
			return
		}
		const params = {
			method: "GET",
			page: page,
			search: searchString
		};
		try {
			const data = await apiCall(searchType, token, params);
			let temp_results = []
			if (searchType === "companies") {
				for (const result of data.results) {
					temp_results.push(<SearchResult name={result.name} image={result.image} url={result.url}/>)
				}
			} else if (searchType === "jobs") {
				for (const result of data.results) {
					temp_results.push(<SearchResult name={result.title} image={result.company.image} url={result.url}/>)
				}
			}
			if (temp_results.length > 0) setResults(temp_results);
			else setResults([<h5>No match found.</h5>])
		} catch (e) {
			console.log(e);
		}
	}

	useEffect( () => {
		const delayBounce = setTimeout( () => {
			getResults()
		}, 1000)
		return () => clearTimeout(delayBounce)
	}, [searchString])

	return (
		<>
			<h3 className={`search-opener normal ${width}`} onClick={toggleSearch}>
				Search for {searchType}
			</h3>
			<div className={`search-expanded-field ${searchState}`}>
				<div className={`search-input-field ${searchFieldState} w60 shadow`}>
					<img className={`search-icon`} src={search_img} alt="" />
					<input
						className={`search-input`}
						type="text"
						placeholder={`Search for ${searchType}...`}
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
					/>
					<CloseButton position="relative" clickEvent={toggleSearch} borderRadius="50%" />

				</div>
				{results}

			</div>
		</>
	);
}
