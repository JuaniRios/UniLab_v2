import React, { useState, useEffect, useParams } from "react";
// STYLES
import "./index.css";
// OTHER
import NavMenu from "../NavMenu";
// IMG
import icon from "../../Assets/img/profile.png";
import PopupForm from "../Forms/PopupForm";
import AttachImage from "../Forms/AttachImage";

export default function JobDetails(props) {

    const [applyForm, setApplyForm] = useState(false);
    const [overlayClass, setOverlayClass] = useState("");
    const [image, setImage] = useState("");
    const [spanText, setSpanText] = useState("Attach your CV");

    return (
        <>
            <NavMenu />
            <div className={`main-content-fixed-2`}>
                <button className={`return-btn`}>&#8617; Return to Jobs</button>
                <div className={`job-details shadow`}>
                    <div className={`job-details-left`}>
                        <img className={`job-company-img`} src={icon} />
                        <div className={`job-mini-btns-holder`}>
                            <span className={`job-mini-btn shadow`}>Website</span>
                            <span className={`job-mini-btn shadow`}>Other Jobs</span>
                        </div>
                        <div className={`job-info-text`}>
                            Sports Business Advisory
                        </div>
                        <div className={`job-info-text`}>
                            21-100 employees
                        </div>
                        <hr className="hr100" />
                        <div className={`job-info-longer-text w100`}>
                            <h3>Company Summary</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                    <div className={`job-details-right`}>
                        <h2>Job Title</h2>
                        <hr className="hr100" />
                        <div className={`job-info-container`}>
                            <div className={`job-info-subcontainer`}>
                                <div className={`job-info-text`}>TYPE</div>
                                <div className={`job-info-text`}><b>Full-time</b></div>
                            </div>
                            <div className={`job-info-subcontainer`}>
                                <div className={`job-info-text`}>FIELD</div>
                                <div className={`job-info-text`}><b>Skilled Labor & Manufacturing</b></div>
                            </div>
                        </div>
                        <hr className="hr100" />
                        <div className={`job-info-text`}>LOCATION</div>
                        <div className={`job-info-text`}><b>Sofia, Bulgaria</b></div>
                        <hr className="hr100" />
                        <div className={`job-info-container`}>
                            <div className={`job-info-subcontainer`}>
                                <div className={`job-info-text`}>SALARY</div>
                                <div className={`job-info-text`}><b>1000 EUR per month</b></div>
                            </div>
                            <div className={`job-info-subcontainer`}>
                                <div className={`job-info-text`}>HOURS</div>
                                <div className={`job-info-text`}><b>40 hours per week</b></div>
                            </div>
                        </div>
                        <hr className="hr100" />
                        <div className={`job-info-longer-text w100`}>
                            <h3>What you will do</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                        <hr className="hr100" />
                        <div className={`job-info-longer-text w100`}>
                            <h3>Requirements</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                        <hr className="hr100" />
                        <div className={`job-info-longer-text w100`}>
                            <h3>What we offer</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
                <button className={`apply-btn uni-button`} type="button" onClick={() => setApplyForm(applyForm ? false : true)}>Apply</button>
            </div>
            {applyForm ? (
                <PopupForm
                    title="Apply for this job"
                    popupClasses={[applyForm, overlayClass]}
                    setPopupClasses={() => setApplyForm(applyForm ? false : true)}
                >
                    <h4 className="w100">Curriculum Vitae (CV)</h4>
                    <AttachImage
                        label="Attach your CV"
                        document={true}
                        image={image}
                        setImage={setImage}
                        avatar={false}
                        spanText={spanText}
                        setSpanText={setSpanText}
                    />
                    <h4 className="w100">Motivation/Cover Letter</h4>
                    <AttachImage
                        label="Attach your letter"
                        document={true}
                        image={image}
                        setImage={setImage}
                        avatar={false}
                        spanText={spanText}
                        setSpanText={setSpanText}
                    />



                    <h4>
                        This company will also have access to your profile when you apply. We recommend that you finish putting your
                        profile up to date before applying.
                    </h4>
                </PopupForm>
            ) : null
            }
        </>
    );
}