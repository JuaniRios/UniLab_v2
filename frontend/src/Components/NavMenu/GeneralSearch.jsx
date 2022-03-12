import React, { useState, useEffect } from "react";
// STYLES
import "./GeneralSearch.css";
// IMAGES
import search_icon from "../../Assets/img/top-nav/search.png";
import CloseButton from "../Buttons/CloseButton";
import { CSSTransition } from "react-transition-group";
import RectangleItem from "../RectangleItem";

export default function GeneralSearch(props) {
	return (
		<div className="search-menu-opened">
			<CSSTransition
				in={props.display}
				unmountOnExit
				timeout={500}
				classNames={"menu-search"}
			>
				<form className={`search-wrapper  shadow flex-row a-i-c j-c-c`}>
					<img id="search-icon" src={search_icon} alt="Magnifying Glass" title="Search" />

					<input
						className={`search-field noshadow`}
						name="main-search"
						type="search"
						placeholder="Search UniLab..."
					/>

					<CloseButton
						clickEvent={() => {
							props.setDisplay(false);
						}}
						position="relative"
						borderRadius="50%"
					/>
				</form>
			</CSSTransition>
			<h3
				style={{
					zIndex: "10500",
					width: "60%",
					margin: "0 auto",
					padding: "1rem",
					background: "white",
					borderRadius: "0",
					boxShadow: "none",
				}}
			>
				Companies
			</h3>
			<RectangleItem
				content="Company1"
				style={{
					zIndex: "10500",
					width: "60%",
					margin: "0 auto",
					background: "white",
					borderRadius: "0",
					boxShadow: "none",
				}}
			/>
			<RectangleItem
				content="Company2"
				style={{
					zIndex: "10500",
					width: "60%",
					margin: "0 auto",
					background: "white",
					borderRadius: "0",
					boxShadow: "none",
				}}
			/>
			<h3
				style={{
					zIndex: "10500",
					width: "60%",
					margin: "0 auto",
					padding: "1rem",
					background: "white",
					borderRadius: "0",
					boxShadow: "none",
				}}
			>
				Jobs
			</h3>
			<RectangleItem
				content="Job1"
				style={{
					zIndex: "10500",
					width: "60%",
					margin: "0 auto",
					background: "white",
					borderRadius: "0",
					boxShadow: "none",
				}}
			/>
			<RectangleItem
				content="Job2"
				style={{
					zIndex: "10500",
					width: "60%",
					margin: "0 auto",
					background: "white",
					borderRadius: "0",
					boxShadow: "none",
				}}
			/>
			<h3
				style={{
					zIndex: "10500",
					width: "60%",
					margin: "0 auto",
					padding: "1rem",
					background: "white",
					borderRadius: "0",
					boxShadow: "none",
				}}
			>
				Universities
			</h3>
			<RectangleItem
				content="University1"
				style={{
					zIndex: "10500",
					width: "60%",
					margin: "0 auto",
					background: "white",
					borderRadius: "0",
					boxShadow: "none",
				}}
			/>
			<RectangleItem
				content="University2"
				style={{
					zIndex: "10500",
					width: "60%",
					margin: "0 auto",
					background: "white",
					borderRadius: "0",
					boxShadow: "none",
				}}
			/>
		</div>
	);
}
