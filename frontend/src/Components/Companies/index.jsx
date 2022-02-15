import React, {useState} from "react";
import NavMenu from "../NavMenu";
import Search from "../Search";
import Slider from "../Slider";
// ICONS
import mainBackground from "../../Assets/img/vienna.jpg";
import CompanyForm from "./CompanyForm";
import {useAuthState} from "../../Context";

export default function Companies(props) {
	const {userData} = useAuthState()
	const [formToggled, setFormToggled] = useState(false)
	document.title = "Companies - UniLab";
	document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
	document.body.classList.remove("noscroll");
	var mainFrameStyle = {
		background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${mainBackground})`,
		backgroundPosition: "center center",
		backgroundSize: "cover",
	};

	const createCompanyButton = <>
		<div className={`uni-form-btn uni-button`} onClick={(e) => setFormToggled(true)}>
			Create a company page
		</div>
	</>
	return (
		<>
			<NavMenu />
			<div className={`main-content-fixed`} style={mainFrameStyle}>
				<Search searchType="companies" width="w60" />
				{userData.allowed_company_creation && createCompanyButton}
				<Slider contentType={"companies"} reloadOn={formToggled}/>

				<CompanyForm toggle={[formToggled,setFormToggled]}/>
			</div>
		</>
	);
}
