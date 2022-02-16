import React from "react";
// STYLES
import "./SideLanguageMenu.css";
// IMAGES
import english_icon from "../../Assets/img/languages/en.webp";
import spanish_icon from "../../Assets/img/languages/es.webp";
import german_icon from "../../Assets/img/languages/de.webp";
import russian_icon from "../../Assets/img/languages/ru.webp";
import french_icon from "../../Assets/img/languages/fr.webp";
import { CSSTransition } from "react-transition-group";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "i18next";

export default function SideLanguageMenu(props) {
	const {i18n} = useTranslation()

	function switchLang(lan){
		i18n.changeLanguage(lan)
		props.setDisplay(false)
	}
	return (
		<>
			<CSSTransition in={props.display} unmountOnExit timeout={500} classNames={"menu-lang"}>
				<aside className={`language-menu language-menu-opened shadow`}>
					<button
						className={`language-close-button close-button`}
						onClick={() => {
							props.setDisplay(false);
						}}
					/>

					<h2 className={`select-lang`}>Select Language</h2>

					<div className={`lang-menu-btn-holder w100`}>
						<button className={`language-links`} onClick={()=>{switchLang("en")}}>
							<img src={english_icon} alt="English Flag" />
							<p>English</p>
						</button>

						<button className={`language-links`} onClick={()=>{switchLang("de")}}>
							<img src={german_icon} alt="German Flag" />
							<p>German</p>
						</button>

						<button className={`language-links`} onClick={()=>{switchLang("fr")}}>
							<img src={french_icon} alt="French Flag" />
							<p>French</p>
						</button>

						<button className={`language-links`} onClick={()=>{switchLang("es")}}>
							<img src={spanish_icon} alt="Spanish Flag" />
							<p>Spanish</p>
						</button>

						<button className={`language-links`} onClick={()=>{switchLang("ru")}}>
							<img src={russian_icon} alt="Russian Flag" />
							<p>Russian</p>
						</button>
					</div>
				</aside>
			</CSSTransition>
		</>
	);
}
