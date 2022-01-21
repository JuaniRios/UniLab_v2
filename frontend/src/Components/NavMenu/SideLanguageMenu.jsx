import React from "react";
// STYLES
import "./SideLanguageMenu.css";
// IMAGES
import english_icon from "../../Assets/img/languages/en.webp";
import spanish_icon from "../../Assets/img/languages/es.webp";
import german_icon from "../../Assets/img/languages/de.webp";
import russian_icon from "../../Assets/img/languages/ru.webp";
import french_icon from "../../Assets/img/languages/fr.webp";

export default function SideLanguageMenu(props) {
	return (
		<>
			<div className={`overlay shown`} onClick={() => props.setDisplay(false)}/>

			<aside className={`language-menu language-menu-opened shadow`}>
				<button
					className={`language-close-button close-button`}
					onClick={() => {props.setDisplay(false)}}
				/>

				<h2>Select Language</h2>

				<div className={`lang-menu-btn-holder w100`}>
					<a className={`language-links`} href="../en">
						<img src={english_icon} alt="English Flag" />
						<p>English</p>
					</a>

					<a className={`language-links`} href="../de">
						<img src={german_icon} alt="German Flag" />
						<p>German</p>
					</a>

					<a className={`language-links`} href="../fr">
						<img src={french_icon} alt="French Flag" />
						<p>French</p>
					</a>

					<a className={`language-links`} href="../es">
						<img src={spanish_icon} alt="Spanish Flag" />
						<p>Spanish</p>
					</a>

					<a className={`language-links`} href="../ru">
						<img src={russian_icon} alt="Russian Flag" />
						<p>Russian</p>
					</a>
				</div>
			</aside>
		</>
	);
}
