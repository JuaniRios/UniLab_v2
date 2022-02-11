import React, {useState} from "react";
// ICONS
import mainBackground from "../../Assets/img/vienna.jpg";
// OTHER
import NavMenu from "../NavMenu";
import Search from "../Search";
import Slider from "../Slider";
import UniversityForm from "./UniversityForm";
import GeneralForm from "../Forms/GeneralForm";
import BasicInput from "../Forms/BasicInput";
import SelectorInput from "../Forms/SelectorInput";
import TextArea from "../Forms/TextArea";
import AttachImage from "../Forms/AttachImage";
import DoubleInputWrap from "../Forms/DoubleInputWrap";

export default function Universities(props) {
	const [formToggled, setFormToggled] = useState(false)

	document.title = "Universities - UniLab";
	document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
	document.body.classList.remove("noscroll");
	var mainFrameStyle = {
		background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${mainBackground})`,
		backgroundPosition: "center center",
		backgroundSize: "cover",
	};


	return (
		<>
			<NavMenu />
			<div className={`main-content-fixed`} style={mainFrameStyle}>
				<Search searchType="universities" width="w60" />
				<div className={`uni-form-btn uni-button`} onClick={(e) => setFormToggled(true)}>
				Create a university page
				</div>
				<Slider contentType={"universities"} />
				<UniversityForm toggle={[formToggled, setFormToggled]}/>
			</div>
		</>
	);
}
