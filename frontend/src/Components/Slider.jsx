import React, { useState, useEffect, useReducer, useRef } from "react";
import { NavLink } from "react-router-dom";
// STYLES
import "./Slider.css";
// IMAGES
import microsoft_icon from "../Assets/img/ms.jpg";
import google_icon from "../Assets/img/google-logo.webp";

function Slider(props) {

    const slider = useRef(null);
    const moreBtn = useRef(null);

    function toggleSlide(direction) {
        var currentLeft = parseInt(slider.current.style.left);
        var sliderChildren = (slider.current.childElementCount - 1);
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
        if ((slider.current.childElementCount - 1) < 10) {
            moreBtn.current.classList.add('hidden');
        } else {
            moreBtn.current.classList.remove('hidden');
        }

        var sliderWidth = slider.current.childElementCount * 20;
        slider.current.style.width = `${sliderWidth}rem`;
        slider.current.style.left = "0rem";
    });

    return (
        <div className={`slider-wrapper`}>

            <div className={`slider-title normal flex-row a-i-c j-c-s-b`}>
                <h2>Discover Jobs</h2>
                <span className={`filter-btn noselect`}>Filter</span>
            </div>

            <button className={`arrow-btn arrow-prev`} onClick={() => toggleSlide("prev")}/>
            <button className={`arrow-btn arrow-next`} onClick={() => toggleSlide("next")}/>

            <div className={`slider`} ref={slider}>

                <div className={`slider-item shadow`}>

                    <div className={`slider-icon-holder`}>
                        <img className={`slider-icon`} src={microsoft_icon} alt="" />
                    </div>

                    <div className={`slider-info-holder`}>
                        <NavLink to="/">
                            <h3 className={`link-text`}>Job Title</h3>
                        </NavLink>

                        <p className={`gray-text`}>Company Name</p>
                        <p className={`gray-text`}>City, District, Country</p>
                        <p>
                            <span className={`gray-text smaller-text`}>2 weeks ago</span>
                            <span className={`middle-dot-span orange-text smaller-text`}>4 applicants</span>
                        </p>
                    </div>

                </div>

                <div className={`slider-item shadow`}>

                    <div className={`slider-icon-holder`}>
                        <img className={`slider-icon`} src={google_icon} alt="" />
                    </div>

                    <div className={`slider-info-holder`}>
                        <NavLink to="/">
                            <h3 className={`link-text`}>Job Title</h3>
                        </NavLink>

                        <p className={`gray-text`}>Company Name</p>
                        <p className={`gray-text`}>City, District, Country</p>
                        <p>
                            <span className={`gray-text smaller-text`}>2 weeks ago</span>
                            <span className={`middle-dot-span orange-text smaller-text`}>4 applicants</span>
                        </p>
                    </div>

                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>


                <button className={`more-jobs uni-button`} ref={moreBtn}>More Jobs</button>

            </div>

        </div>
    )
}

export default Slider;