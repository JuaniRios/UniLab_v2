import React, { useState } from "react";
// STYLES
import "./Search.css";

import search_img from "../../Assets/img/top-nav/search.png";
import CloseButton from "../Buttons/CloseButton";

function Search(props) {

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
        }
        else {
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

    return (
        <>
            <h3 className={`search-opener normal ${width}`} onClick={toggleSearch}>
                Search for companies
            </h3>
            <div className={`search-expanded-field ${searchState}`}>
                <div className={`search-input-field ${searchFieldState} w60 shadow`}>
                    <img className={`search-icon`} src={search_img} alt="" />
                    <input className={`search-input`} type="text" placeholder={`Search for ${searchType}...`} />
                    <CloseButton position="relative" clickEvent={toggleSearch} />
                </div>

            </div>

        </>
    );
}

export default Search;