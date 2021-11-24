import microsoft_icon from "../Assets/img/ms.jpg";
import {NavLink} from "react-router-dom";
import "./Slider.css"
import timeSince from "./HelperFunctions/timeSince.js";

export default function SliderCard(props) {
    const content = props.content
    if (props.contentType === "jobs") {

        return (
            <>
                <div className={`slider-item shadow`}>

                        <div className={`slider-icon-holder`}>
                            <img className={`slider-icon`} src={content.company.image} alt="" />
                        </div>

                        <div className={`slider-info-holder`}>
                            <NavLink to="/">
                                <h3 className={`link-text`}>{content.title}</h3>
                            </NavLink>

                            <p className={`gray-text`}>{content.company.name}</p>
                            <p className={`gray-text`}>{content.city}, {content.country}</p>
                            <p>
                                <span className={`gray-text smaller-text`}>{timeSince(content.publish_date)}</span>
                                <span className={`middle-dot-span orange-text smaller-text`}>{content.applicants.length}</span>
                            </p>
                        </div>

                </div>
            </>
        )
    }

    if (props.contentType === "companies") {
    return (
        <>
            <div className={`slider-item shadow`}>

                    <div className={`slider-icon-holder`}>
                        <img className={`slider-icon`} src={content.image} alt="" />
                    </div>

                    <div className={`slider-info-holder`}>
                        <NavLink to="/">
                            <h3 className={`link-text`}>{content.name}</h3>
                        </NavLink>

                        <p className={`gray-text`}>{content.industry_verbose}</p>
                        <p className={`gray-text`}>{content.employee_range}</p>
                        <p>
                            <span className={`gray-text smaller-text`}>{content.rating}</span>
                        </p>
                    </div>

            </div>
        </>
        )
    }

}