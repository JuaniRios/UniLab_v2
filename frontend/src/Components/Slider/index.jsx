import React, { useState, useEffect, useReducer, useRef } from "react";
import { useAuthState } from "../../Context";
import fetchContent from "../HelperFunctions/fetchContent";
import SliderCard from "./SliderCard";
import Loader from "../Loader";
// STYLES
import "./Slider.css";
import apiCall from "../HelperFunctions/apiCall";
import useWindowSize from "../../CustomHooks/useWindowSize";

export default function Slider(props) {
	const windowSize = useWindowSize();
	const authState = useAuthState();
	const contentType = props.contentType;
	const slider = useRef(null);
	const moreBtn = useRef(null);
	const [cards, setCards] = useState([]);
	const [page, setPage] = useState(1);
	const [loaderState, setLoaderState] = useState("shown");
	const header = props.contentType.charAt(0).toUpperCase() + props.contentType.slice(1);

	function toggleSlide(direction) {
		var currentLeft = parseInt(slider.current.style.left);
		var sliderChildren = slider.current.childElementCount - 1;
		var maxSlides = parseInt(sliderChildren / 4);
		var maxWidth = maxSlides * 80;
		if (sliderChildren % 4 === 0) {
			maxSlides = maxSlides - 1;
		}
		if (direction === "prev") {
			if (currentLeft >= 0) {
				return 0;
			}
			var newLeft = currentLeft + 80;
		} else {
			if (currentLeft <= -maxWidth) {
				return 0;
			}
			var newLeft = currentLeft - 80;
		}
		slider.current.style.left = `${newLeft}rem`;
	}
	useEffect(() => {
		if (slider.current.childElementCount - 1 < 10) {
			moreBtn.current.classList.add("hidden");
		} else {
			moreBtn.current.classList.remove("hidden");
		}
		if (windowSize[0] > 1030) {
			var sliderWidth = slider.current.childElementCount * 20;
			slider.current.style.width = `${sliderWidth}rem`;
			slider.current.style.left = "0rem";
		}
	});

	useEffect(() => {
		const params = {
			method: "GET",
			page: page,
		};
		apiCall(contentType, null, params)
			.then((data) => {
				const items = data.results;
				let newCards = [];
				for (let i = 0; i < items.length; i++) {
					let icard = <SliderCard key={i} contentType={contentType} content={items[i]} />;
					newCards.push(icard);
				}
				setLoaderState("hidden");
				setCards(newCards);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [page, props["reloadOn"]]);

	// TODO: Pagination
	return (
		<div className={`slider-wrapper shadow w100`}>
			<div className={`slider-title normal flex-row a-i-c j-c-s-b`}>
				<h3>Discover {header}</h3>
				<span className={`filter-btn noselect`}>Filter</span>
			</div>
			{windowSize[0] < 1030 ? null : (
				<>
					<button
						className={`arrow-btn arrow-prev`}
						onClick={() => toggleSlide("prev")}
					/>
					<button
						className={`arrow-btn arrow-next`}
						onClick={() => toggleSlide("next")}
					/>
				</>
			)}
			<Loader color="orange" size="4" state={loaderState} />
			<div className={`slider`} ref={slider}>
				{cards}

				<button className={`more-jobs uni-button`} ref={moreBtn}>
					More Jobs
				</button>
			</div>
		</div>
	);
}
