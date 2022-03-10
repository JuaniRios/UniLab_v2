import React, { useState, useEffect} from "react";
// STYLES
import "./index.css";
// OTHER
import NavMenu from "../NavMenu";
// IMG
import icon from "../../Assets/img/profile.png";
import PopupForm from "../Forms/PopupForm";
import AttachImage from "../Forms/AttachImage";
import {Link, NavLink, useParams} from "react-router-dom";
import {useAuthState} from "../../Context";
import apiCall from "../HelperFunctions/apiCall";
import urlToPk from "../HelperFunctions/urlToPk";
import {useMessage} from "../../Context/context";

export default function JobDetails(props) {
    const [message, setMessage] = useMessage()
    let urlParams = useParams();
    const {token, userData} = useAuthState()
    const [applyForm, setApplyForm] = useState(false);
    const [overlayClass, setOverlayClass] = useState("");
    const [cv, setCv] = useState("")
    const [letter, setLetter] = useState("")
    const [spanText, setSpanText] = useState("Attach your CV");
    const [companyData, setCompanyData] = useState({})
    const [jobData, setJobData] = useState({})
    // component mount data load-in
    useEffect(async ()=>{
        const job_data = await apiCall(`jobs/${urlParams.id}`, token, {method:"GET"})
        console.log(job_data)
        setJobData(job_data)
        const company_data = await apiCall(job_data.company.url, token, {method:"GET", fullUrl:true})
        setCompanyData(company_data)

    },[])

    async function handleApplication(e) {
        e.preventDefault()
        try {
            const params = {
                method: "POST",
                payload: {
                    "cv": cv,
                    "motivation_letter": letter,
                    "job": jobData.url
                }
            }
            await apiCall("applications", token, params)
        } catch (e) {
            setMessage(`error handling application: ${e}`)
        } finally {
            setApplyForm(false)
        }

    }

    return (
        <>
            <NavMenu />
            <div className={`main-content-fixed-2`}>
                <Link to={"/jobs"} className={`return-btn`}>&#8617; Return to Jobs</Link>
                <div className={`job-details shadow`}>
                    <div className={`job-details-left`}>
                        {companyData && <Link to={`/companies/${urlToPk(companyData.url)}`}><img className={`job-company-img`} src={companyData.image} /></Link>}
                        <div className={`job-mini-btns-holder`}>
                            {jobData.website_url && <a className={`job-mini-btn shadow`} href={jobData.website_url}>Website</a>}
                        </div>
                        <h3 className={`job-info-text`}>
                            {companyData.name}
                        </h3>
                        <div className={`job-info-text`}>
                            {companyData.employee_range_verbose}
                        </div>
                        <hr className="hr100" />
                        <div className={`job-info-longer-text w100`}>
                            <h3>Company Summary</h3>
                            <p>
                                {companyData.description}
                            </p>
                        </div>
                    </div>
                    <div className={`job-details-right`}>
                        <h2>{jobData.title}</h2>
                        <hr className="hr100" />
                        <div className={`job-info-container`}>
                            <div className={`job-info-subcontainer`}>
                                <div className={`job-info-text`}>Employment Type</div>
                                <div className={`job-info-text`}><b>Full-time</b></div>
                            </div>
                            <div className={`job-info-subcontainer`}>
                                <div className={`job-info-text`}>Field</div>
                                <div className={`job-info-text`}><b>{jobData.category_verbose}</b></div>
                            </div>
                        </div>
                        <hr className="hr100" />
                        <div className={`job-info-text`}>Location</div>
                        <div className={`job-info-text`}><b>{jobData.country} {jobData.city && ` · ${jobData.city}`}</b></div>
                        <hr className="hr100" />
                        <div className={`job-info-container`}>
                            <div className={`job-info-subcontainer`}>
                                <div className={`job-info-text`}>Monthly Salary</div>
                                <div className={`job-info-text`}><b>{jobData.salary_per_month} EUR</b></div>
                            </div>
                            <div className={`job-info-subcontainer`}>
                                <div className={`job-info-text`}>Weekly Hours</div>
                                <div className={`job-info-text`}><b>{jobData.hours_per_week} hours</b></div>
                            </div>
                        </div>
                        <hr className="hr100" />
                        <div className={`job-info-longer-text w100`}>
                            <h3>What you will do</h3>
                            <p>
                                {jobData.you_do}
                            </p>
                        </div>
                        <hr className="hr100" />
                        <div className={`job-info-longer-text w100`}>
                            <h3>Requirements</h3>
                            <p>
                                {jobData.requirements}
                            </p>
                        </div>
                        <hr className="hr100" />
                        <div className={`job-info-longer-text w100`}>
                            <h3>What we offer</h3>
                            <p>
                                {jobData.we_offer}
                            </p>
                        </div>
                    </div>
                </div>
                <button className={`apply-btn uni-button`} type="button" onClick={() => setApplyForm(!applyForm)}>Apply</button>
            </div>
            {applyForm ? (
                <PopupForm
                    title="Apply for this job"
                    popupClasses={[applyForm, overlayClass]}
                    setPopupClasses={() => setApplyForm(!applyForm)}
                    handleSubmit={handleApplication}
                >
                    <h4 className="w100">Curriculum Vitae (CV)</h4>
                    <AttachImage
                        label="Attach your CV"
                        document={true}
                        image={cv}
                        setImage={setCv}
                        avatar={false}
                        spanText={spanText}
                        setSpanText={setSpanText}
                    />
                    <h4 className="w100">Motivation/Cover Letter</h4>
                    <AttachImage
                        label="Attach your letter"
                        document={true}
                        image={letter}
                        setImage={setLetter}
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