import {NavLink, useNavigate} from "react-router-dom";
import "./Slider.css";
import "./SliderCard.css";
import timeSince from "../HelperFunctions/timeSince.js";
import urlToPk from "../HelperFunctions/urlToPk";

export default function SliderCard(props) {
	let navigate = useNavigate()
	console.log("content is:")
	console.log(props.content)
	const content = props.content;
	if (props.contentType === "jobs") {
		var applicantsWord = "applicants";
		if (content.title.length > 25) {
			content.title = content.title.slice(0, 25) + "...";
		}
		if (content.applicants.length == 1) {
			applicantsWord = "applicant";
		}
		return (
			<div className={`slider-item shadow`} onClick={()=>{navigate(`/jobs/${urlToPk(content.url)}`)}}>
				<div className={`slider-icon-holder`}>
					<img className={`slider-icon`} src={content.company.image} alt="" />
				</div>

				<div className={`slider-info-holder`}>
					<NavLink to={`/jobs/${urlToPk(content.url)}`} className={`w90`}>
						<p className={`link-text slider-item-title`}>{content.title}</p>
					</NavLink>

					<p className={`gray-text`}>{content.company.name}</p>
					<p className={`gray-text`}>
						{content.city}, {content.country}
					</p>
					<p>
						<span className={`gray-text smaller-text`}>
							{timeSince(content.publish_date)}
						</span>
						<span className={`middle-dot-span orange-text smaller-text`}>
							{content.applicants.length} {applicantsWord}
						</span>
					</p>
				</div>
			</div>
		);
	}
	if (props.contentType === "companies") {
		if (content.name.length > 25) {
			content.name = content.name.slice(0, 25) + "...";
		}
		return (
			<div className={`slider-item shadow`} onClick={()=>{navigate(`/companies/${urlToPk(content.url)}`)}}>
				<div className={`slider-icon-holder`}>
					<img className={`slider-icon`} src={content.image} alt="" />
				</div>

				<div className={`slider-info-holder`}>
					<NavLink to={`/companies/${urlToPk(content.url)}`} className={`w90`}>
						<p className={`link-text slider-item-title`}>{content.name}</p>
					</NavLink>

					<p className={`gray-text`}>{content.industry_verbose}</p>
					<p className={`gray-text`}>{content.employee_range}</p>
					<p>
						<span className={`gray-text smaller-text`}>{content.rating}</span>
					</p>
				</div>
			</div>
		);
	}
	if (props.contentType === "universities") {
		if (content.name.length > 25) {
			content.name = content.name.slice(0, 25) + "...";
		}
		return (
			<div className={`slider-item shadow`} onClick={()=>{navigate(`/universities/${urlToPk(content.url)}`)}}>
				<div className={`slider-icon-holder`}>
					<img className={`slider-icon`} src={content.image} alt="" />
				</div>

				<div className={`slider-info-holder`}>
					<NavLink to={`/universities/${urlToPk(content.url)}`} className={`w90`}>
						<p className={`link-text slider-item-title`}>{content.name}</p>
					</NavLink>

					<p className={`gray-text`}>{content.student_range_verbose}</p>
					<p>
						<span className={`gray-text smaller-text`}>{content.rating}</span>
					</p>
				</div>
			</div>
		);
	}
}
