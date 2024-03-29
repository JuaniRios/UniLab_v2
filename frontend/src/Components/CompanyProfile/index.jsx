import React, { useEffect, useReducer, useState, Suspense } from "react";
import { NavLink, useParams, Link, useNavigate } from "react-router-dom";
import NavMenu from "../NavMenu";
import "./index.css";
// ICONS
import profile_icon from "../../Assets/img/profile.png";
import pencil_icon from "../../Assets/img/profile/pencil.png";
import redirect_icon from "../../Assets/img/profile/redirect.svg";
// OTHER COMPONENTS
import ProfileContentFrame from "./ProfileContentFrame";
import ProfileContentItem from "./ProfileContentItem";
import default_education_icon from "../../Assets/img/defaults/university.jpg";
import CollapsibleMenu from "../CollapsibleMenu";
import PopupForm from "../Forms/PopupForm";
import BasicInput from "../Forms/BasicInput";
import TextArea from "../Forms/TextArea";
import PostCommentContainer from "./PostCommentContainer";
import { useAuthState } from "../../Context";
import apiCall from "../HelperFunctions/apiCall";
import { useMessage } from "../../Context/context";
import AttachImage from "../Forms/AttachImage";
import DoubleInputWrap from "../Forms/DoubleInputWrap";
import SelectorInput from "../Forms/SelectorInput";
import ImageGallery from "./ImageGallery";
import AdminList from "./AdminList";
import { CSSTransition } from "react-transition-group";
import RectangleItem from "../RectangleItem";
import ApplicantsSlider from "./ApplicantsSlider";
import Applicant from "./Applicant";
import urlToPk from "../HelperFunctions/urlToPk";

export default function CompanyProfile(props) {
	const { token } = useAuthState();
	const [message, setMessage] = useMessage();
	let urlParams = useParams();
	let navigate = useNavigate();

	const [companyData, setCompanyData] = useState({});
	const [pictureItems, setPictureItems] = useState([]);
	const [jobItems, setJobItems] = useState([]);
	const [forceReload, setForceReload] = useState(false); // for admin list
	const [postItems, setPostItems] = useState([]);
	const [commentItems, setCommentItems] = useState([]);

	const [applicantsToggle, setApplicantsToggle] = useState(false);
	const [applicantsList, setApplicantsList] = useState(<></>);

	const [menuClassesArray, setMenuClassesArray] = useState([
		"active-menu-item",
		"",
		"",
		"",
		"",
		"",
	]);
	const [contentClassesArray, setContentClassesArray] = useState([
		"",
		"hidden",
		"hidden",
		"hidden",
		"hidden",
		"hidden",
	]);

	// FORM STATES
	// Company Info Form
	const [companyName, setCompanyName] = useState("");
	const [companyDescription, setCompanyDescription] = useState("");
	const [companyWebsite, setCompanyWebsite] = useState("");
	const [companyVideo, setCompanyVideo] = useState("");
	const [companyImage, setCompanyImage] = useState("");
	const [companyIndustry, setCompanyIndustry] = useState("");
	const [companyEmployeeRange, setCompanyEmployeeRage] = useState("");
	const [companyCountry, setCompanyCountry] = useState("");

	// Add Pictures Form
	const [newImage, setNewImage] = useState("");
	const [companyImages, setCompanyImages] = useState([]);

	// Add Jobs Form
	const [jobTitle, setJobTitle] = useState("");
	const [jobCity, setJobCity] = useState("");
	const [jobCountry, setJobCountry] = useState("");
	const [jobHours, setJobHours] = useState("");
	const [jobSalary, setJobSalary] = useState("");
	const [jobCategory, setJobCategory] = useState("");
	const [jobType, setJobType] = useState("");
	const [jobYouDo, setJobYouDo] = useState("");
	const [jobWeOffer, setJobWeOffer] = useState("");
	const [jobRequirements, setJobRequirements] = useState("");

	const [jobFormFilled, setJobFormFilled] = useState(false);

	// update jobFormFilled
	useEffect(() => {
		const allFields = [
			jobTitle,
			jobCity,
			jobCountry,
			jobCategory,
			jobType,
			jobYouDo,
			jobWeOffer,
			jobRequirements,
		];
		setJobFormFilled(allFields.every((field) => !!field));
	}, [
		jobTitle,
		jobCity,
		jobCountry,
		jobCategory,
		jobType,
		jobYouDo,
		jobWeOffer,
		jobRequirements,
	]);

	function changePopupClasses(initState) {
		if (initState[1] === "hidden") {
			document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
			document.body.classList.add("noscroll");
			return ["popup-opened", ""];
		} else {
			document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
			document.body.classList.remove("noscroll");
			return ["popup-closed", "hidden"];
		}
	}

	const [popupClasses, setPopupClasses] = useReducer(changePopupClasses, [
		"popup-closed",
		"hidden",
	]);
	const [popupClasses2, setPopupClasses2] = useReducer(changePopupClasses, [
		"popup-closed",
		"hidden",
	]);
	const [popupClasses3, setPopupClasses3] = useReducer(changePopupClasses, [
		"popup-closed",
		"hidden",
	]);
	const [popupClasses4, setPopupClasses4] = useReducer(changePopupClasses, [
		"popup-closed",
		"hidden",
	]);

	function changeActiveItem(n) {
		let pseudoArray = ["", "", "", "", "", ""];
		let pseudoArray2 = ["hidden", "hidden", "hidden", "hidden", "hidden", "hidden"];
		pseudoArray[n] = "active-menu-item";
		pseudoArray2[n] = "";
		setMenuClassesArray(pseudoArray);
		setContentClassesArray(pseudoArray2);
	}

	if (
		popupClasses[1] === "hidden" &&
		popupClasses2[1] === "hidden" &&
		popupClasses3[1] === "hidden" &&
		popupClasses4[1] === "hidden"
	) {
		document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
		document.body.classList.remove("noscroll");
	}

	useEffect(() => {
		switch (window.location.href.substring(window.location.href.indexOf("#") + 1)) {
			case "basic-info":
				changeActiveItem(0);
				break;
			case "pictures":
				changeActiveItem(1);
				break;
			case "jobs":
				changeActiveItem(2);
				break;
			case "admins":
				changeActiveItem(3);
				break;
			case "posts":
				changeActiveItem(4);
				break;
			case "comments":
				changeActiveItem(5);
				break;
			default:
				changeActiveItem(0);
				break;
		}
	}, []);

	// load in initial data
	useEffect(async () => {
		let data;
		// company data
		try {
			data = await apiCall(`companies/${urlParams.id}`, token, { method: "GET" });
			setCompanyData(data);
			setCompanyName(data.name);
			setCompanyDescription(data.description);
			setCompanyWebsite(data.website_url);
			setCompanyVideo(data.video_url);
			setCompanyIndustry(data.industry);
			setCompanyEmployeeRage(data.employee_range);
			setCompanyCountry(data.country);
		} catch (e) {
			setMessage(`fetch on company data failed: ${e}`);
		}

		// company posts
		try {
			const posts = await apiCall(`posts?company_owner=${data.url}&`, token, {
				method: "GET",
			});
			console.table(posts);
			let newPostItems = [];
			let keyIdx = 0;
			for (const post of posts.results) {
				newPostItems.push(<PostCommentContainer content={post.content} key={keyIdx} />);
				keyIdx++;
			}
			setPostItems(newPostItems);
		} catch (e) {
			setMessage(`fetch on company posts failed: ${e}`);
		}

		// company comments
		try {
			const comments = await apiCall(`comments?company_owner=${data.url}&`, token, {
				method: "GET",
			});
			let newCommentItems = [];
			let keyIdx = 0;
			for (const comment of comments.results) {
				newCommentItems.push(
					<PostCommentContainer content={comment.content} key={keyIdx} />
				);
				keyIdx++;
			}
			setCommentItems(newCommentItems);
		} catch (e) {
			setMessage(`fetch on company comments failed: ${e}`);
		}

		//company pictures
		try {
			let images = await apiCall(`company-pictures?owner=${data.url}`, token, {
				method: "GET",
			});
			setCompanyImages(images.results);
		} catch (e) {
			setMessage(`fetch on company pictues failed: ${e}`);
		}

		// company jobs
		try {
			const jobs = await apiCall(`jobs?owner=${data.url}`, token, { method: "GET" });
			let newJobItems = [];
			for (const [id, job] of jobs.results.entries()) {
				newJobItems.push(
					<RectangleItem
						content={job.title}
						btns={["View Job", `${job.applicants.length} applicants`, "Delete Job"]}
						onClick={[
							(e) => {
								navigate(`/jobs/${urlToPk(job.url)}`);
							},
							(e) => {
								return showApplicants(job);
							},
							(e) => {
								return deleteJob(job.url, id);
							},
						]}
						key={id}
						img={data.image}
					/>
				);
			}
			setJobItems(newJobItems);
		} catch (e) {
			setMessage(`fetch error on jobs: ${e}`);
		}
	}, []);

	async function showApplicants(job) {
		try {
			if (job["applications"].length === 0) {
				setMessage("No applicants yet :(");
				return;
			}
			const applications = [];
			// get applications from url
			for (const application of job["applications"]) {
				applications.push(
					await apiCall(application, token, { method: "GET", fullUrl: true })
				);
			}

			// build application widgets
			const newApplicationsList = [];
			for (const application of applications) {
				newApplicationsList.push(
					<Applicant
						first_name={application.user.first_name}
						last_name={application.user.last_name}
						icon={application.user.image}
						url={application.user.url}
						cv={application.cv}
						motivation_letter={application.motivation_letter}
					/>
				);
			}

			// build main widget for application list
			setApplicantsList(
				<ApplicantsSlider
					jobName={job.title}
					closeEvent={(e) => {
						setApplicantsToggle(false);
					}}
				>
					{newApplicationsList}
				</ApplicantsSlider>
			);
			setApplicantsToggle(true);
		} catch (e) {
			setMessage(`error in showApplicants: ${e}`);
		}
	}

	async function deleteJob(jobUrl, id) {
		try {
			const params = {
				method: "DELETE",
				fullUrl: true,
			};

			// Database Change
			await apiCall(jobUrl, token, params);

			// UI Change
			setJobItems((prev) => {
				return prev.filter((item) => item.key !== `${id}`);
			});
		} catch (e) {
			setMessage(`delete job error: ${e}`);
		}
	}

	async function updateBasicInfo(e) {
		e.preventDefault();
		setPopupClasses();
		let payload = {
			name: companyName,
			description: companyDescription,
			website_url: companyWebsite,
			video_url: companyVideo,
			industry: companyIndustry,
			employee_range: companyEmployeeRange,
			country: companyCountry,
		};

		if (companyImage) {
			payload["image"] = companyImage;
		}
		const params = {
			payload: payload,
			method: "PATCH",
			fullUrl: true,
		};

		try {
			const newData = await apiCall(companyData.url, token, params);
			setCompanyData(newData);
		} catch (e) {
			setMessage(e);
		}
	}

	async function postPicture(e) {
		setPopupClasses2();
		e.preventDefault();
		const params = {
			method: "POST",
			payload: { image: newImage, owner: companyData.url },
		};
		try {
			await apiCall("company-pictures", token, params);
		} catch (e) {
			setMessage(e);
		}
	}

	async function postJob(e) {
		setPopupClasses3();
		e.preventDefault();
		const payload = {
			title: jobTitle,
			city: jobCity,
			country: jobCountry,
			hours_per_week: jobHours,
			salary_per_month: jobSalary,
			category: jobCategory,
			type: jobType,
			you_do: jobYouDo,
			we_offer: jobWeOffer,
			requirements: jobRequirements,
			owner: companyData.url,
		};
		const params = {
			method: "POST",
			payload: payload,
		};
		try {
			const newJob = await apiCall("jobs", token, params);
			const newIdx =
				jobItems.length > 0 ? parseInt(jobItems[jobItems.length - 1].key) + 1 : 0;
			const newJobItem = (
				<RectangleItem
					content={newJob.title}
					btns={["View Job", `${newJob.applicants.length} applicants`, "Delete Job"]}
					onClick={[
						(e) => {
							navigate(`/jobs/${urlToPk(newJob.url)}`);
						},
						(e) => {
							return showApplicants(newJob);
						},
						(e) => {
							return deleteJob(newJob.url, newIdx);
						},
					]}
					key={newIdx}
					img={companyData.image}
				/>
			);
			setJobItems((prev) => prev.concat(newJobItem));
		} catch (e) {
			setMessage(`postJob api call failed. error: ${e}`);
		}
	}

	return (
		<>
			<NavMenu />

			<div className={`main-content`}>
				<div className={`profile-company`}>
					<PopupForm
						title="Edit company information"
						popupClasses={popupClasses}
						setPopupClasses={setPopupClasses}
						handleSubmit={updateBasicInfo}
					>
						<DoubleInputWrap>
							<BasicInput
								label={"Company Name"}
								required={true}
								value={companyName}
								setter={setCompanyName}
							/>
							<BasicInput
								label={"Country"}
								required={false}
								value={companyCountry}
								setter={setCompanyCountry}
							/>
						</DoubleInputWrap>

						<DoubleInputWrap>
							<SelectorInput
								label={"Size"}
								required={false}
								value={companyEmployeeRange}
								setter={setCompanyEmployeeRage}
								choices={{
									"1-20 employees": 1,
									"21-100 employees": 2,
									"101-200 employees": 3,
									"201-500 employees": 4,
									"501+ employees": 5,
								}}
							/>
							<SelectorInput
								label={"Industry"}
								required={false}
								value={companyIndustry}
								setter={setCompanyIndustry}
								choices={{
									"Energy, Utilities and Resources": 1,
									"Government and Public Sector": 2,
									"Pharmaceuticals and Life Sciences": 3,
									"Real Estate": 4,
									"Sports Business Advisory": 5,
									"Financial Services": 6,
									"Health Services": 7,
									"Industrial Manufacturing": 8,
									"Retail and Consumer Goods": 9,
									"Technology, Media, and Telecommunications": 10,
									Other: 11,
								}}
							/>
						</DoubleInputWrap>

						<DoubleInputWrap>
							<BasicInput
								label={"Website URL"}
								required={false}
								value={companyWebsite}
								setter={setCompanyWebsite}
							/>
							<BasicInput
								label={"Video URL"}
								required={false}
								value={companyVideo}
								setter={setCompanyVideo}
							/>
						</DoubleInputWrap>

						<TextArea
							label={"Summary"}
							required={false}
							value={companyDescription}
							setter={setCompanyDescription}
						/>

						<AttachImage
							label={"Upload Profile Picture"}
							required={false}
							image={companyImage}
							setImage={setCompanyImage}
						/>
					</PopupForm>

					<PopupForm
						title="Add a Picture"
						popupClasses={popupClasses2}
						setPopupClasses={setPopupClasses2}
						handleSubmit={postPicture}
					>
						<AttachImage
							label={"Upload Picture"}
							required={false}
							image={newImage}
							setImage={setNewImage}
						/>
					</PopupForm>

					<PopupForm
						title="Add a Job"
						popupClasses={popupClasses3}
						setPopupClasses={setPopupClasses3}
						handleSubmit={postJob}
					>
						<BasicInput
							name="add-job-title"
							type="text"
							width="100%"
							label="Job Title"
							value={jobTitle}
							setter={setJobTitle}
							required="yes"
						/>

						<DoubleInputWrap>
							<BasicInput
								name="add-job-country"
								type="text"
								width="47%"
								label="Country"
								value={jobCountry}
								setter={setJobCountry}
								required="yes"
							/>
							<BasicInput
								name="add-job-hours"
								type="text"
								width="47%"
								label="City"
								value={jobCity}
								setter={setJobCity}
								required="yes"
							/>
						</DoubleInputWrap>

						<DoubleInputWrap>
							<SelectorInput
								label={"Job Type"}
								required={false}
								vale={jobType}
								setter={setJobType}
								choices={{
									"Full-time": 1,
									"Part-time": 2,
									Contract: 3,
									Temporary: 4,
									Internship: 5,
								}}
							/>
							<SelectorInput
								label={"Category"}
								required={false}
								vale={jobCategory}
								setter={setJobCategory}
								choices={{
									Administrative: 1,
									"Arts & Design": 2,
									Business: 3,
									Consulting: 4,
									"Customer Services & Support": 5,
									Education: 6,
									Engineering: 7,
									"Finance & Accounting": 8,
									Healthcare: 9,
									"Human Resources": 10,
									"Information Technology": 11,
									Legal: 12,
									Marketing: 13,
									"Media & Communications": 14,
									"Military & Protective Services": 15,
									Operations: 16,
									Other: 17,
									"Product & Project Management": 18,
									"Research & Science": 19,
									"Retail & Food Services": 20,
									Sales: 21,
									"Skilled Labor & Manufacturing": 22,
									Transportation: 23,
								}}
							/>
						</DoubleInputWrap>

						<DoubleInputWrap>
							<BasicInput
								name="add-job-country"
								type="number"
								label="Salary per Month (EUR)"
								value={jobSalary}
								setter={setJobSalary}
								required="yes"
								maxLength={7}
							/>
							<BasicInput
								name="add-job-hours"
								type="number"
								label="Hours per Week"
								value={jobHours}
								setter={setJobHours}
								required="yes"
								maxLength={2}
							/>
						</DoubleInputWrap>

						<TextArea
							width="100%"
							label="What you will do"
							value={jobYouDo}
							setter={setJobYouDo}
							rows="5"
							menuTop="20%"
							required="yes"
						/>

						<TextArea
							width="100%"
							label="What we offer"
							value={jobWeOffer}
							setter={setJobWeOffer}
							rows="5"
							menuTop="20%"
							required="yes"
						/>

						<TextArea
							width="100%"
							label="Requirements"
							value={jobRequirements}
							setter={setJobRequirements}
							rows="5"
							menuTop="20%"
							required="yes"
						/>
					</PopupForm>

					<div className={`main-profile-menu-company`}>
						<div className={`fixed-menu-company`}>
							<NavLink
								to="#basic-info"
								className={`profile-menu-item-company ${menuClassesArray[0]}`}
								onClick={(e) => changeActiveItem(0)}
							>
								<div className={`item-text`}>Company Information</div>
							</NavLink>

							<NavLink
								to="#education"
								className={`profile-menu-item-company ${menuClassesArray[1]}`}
								onClick={(e) => changeActiveItem(1)}
							>
								<div className={`item-text`}>Pictures</div>
							</NavLink>

							<NavLink
								to="#experience"
								className={`profile-menu-item-company ${menuClassesArray[2]}`}
								onClick={(e) => changeActiveItem(2)}
							>
								<div className={`item-text`}>Jobs</div>
							</NavLink>

							<NavLink
								to="#skills"
								className={`profile-menu-item-company ${menuClassesArray[3]}`}
								onClick={(e) => changeActiveItem(3)}
							>
								<div className={`item-text`}>Admins</div>
							</NavLink>

							<NavLink
								to="#posts"
								className={`profile-menu-item-company ${menuClassesArray[4]}`}
								onClick={(e) => changeActiveItem(4)}
							>
								<div className={`item-text`}>Posts</div>
							</NavLink>

							<NavLink
								to="#comments"
								className={`profile-menu-item-company ${menuClassesArray[5]}`}
								onClick={(e) => changeActiveItem(5)}
							>
								<div className={`item-text`}>Comments</div>
							</NavLink>
						</div>
					</div>

					<div className={`profile-content-container-company`}>
						<ProfileContentFrame
							id="basic-info"
							className={`${contentClassesArray[0]}`}
						>
							<div className={`profile-banner-company`}>
								<img
									className={`profile-banner-pfp-company`}
									src={companyData.image}
									alt="Profile icon"
								/>
							</div>
							<div className={`profile-basic-info`}>
								<img
									className={`basic-info-toggler-company`}
									src={pencil_icon}
									alt="Pen icon"
									onClick={setPopupClasses}
								/>
								<h3>{companyData.name}</h3>
								<p>{companyData.industry_verbose}</p>
								<p>{companyData.employee_range_verbose}</p>
								<p>
									<span className={`gray-text`}>{companyData.country}</span>
									<span className={`gray-text`}> · </span>
									<NavLink
										to={companyData.website || "#"}
										className={`website-link`}
									>
										Website
										<img src={redirect_icon} alt="Redirect icon" />
									</NavLink>
								</p>
								<h3>Summary</h3>
								<p>
									{companyData.description ||
										"You haven't added a summary yet..."}
								</p>
							</div>
						</ProfileContentFrame>

						<ProfileContentFrame
							id="education"
							className={`${contentClassesArray[1]}`}
							margin={true}
							title="Pictures"
							plusBtn={true}
							onClick={setPopupClasses2}
						>
							<ImageGallery images={companyImages} />
						</ProfileContentFrame>

						{applicantsToggle && applicantsList}

						<ProfileContentFrame
							id="experience"
							className={`${contentClassesArray[2]}`}
							margin={true}
							title="Jobs"
							plusBtn={true}
							onClick={setPopupClasses3}
						>
							{jobItems || (
								<h4 className={`normal`} style={{ margin: "1rem 0" }}>
									You haven't added any Jobs yet...
								</h4>
							)}
						</ProfileContentFrame>

						<ProfileContentFrame
							id="skills"
							className={`${contentClassesArray[3]}`}
							margin={true}
							title="Admins"
							plusBtn={false}
							onClick={setPopupClasses4}
						>
							<CSSTransition
								in={!!companyData}
								unmountOnExit
								timeout={500}
								classNames={"admin-list-transition"}
							>
								<>
									<div className={`add-new-field custom-scroll`}>
										<AdminList
											title="Add a new admin:"
											option="ADD"
											forceReload={[forceReload, setForceReload]}
											companyUrl={companyData.url}
										/>
									</div>
									<div className={`add-new-field custom-scroll`}>
										<AdminList
											title={`Manage admins:`}
											option="REMOVE"
											forceReload={[forceReload, setForceReload]}
											companyUrl={companyData.url}
										/>
									</div>
								</>
							</CSSTransition>
						</ProfileContentFrame>

						<ProfileContentFrame
							id="posts"
							className={`${contentClassesArray[4]}`}
							margin={true}
							title="Posts"
						>
							{/*{postItems}*/}
							<h2>Work in progress</h2>
							{postItems || (
								<h4 className={`normal`} style={{ margin: "1rem 0" }}>
									You haven't posted anything yet...
								</h4>
							)}
						</ProfileContentFrame>

						<ProfileContentFrame
							id="comments"
							className={`${contentClassesArray[5]}`}
							margin={true}
							title="Comments"
						>
							{/*{commentItems}*/}
							<h2>Work in progress</h2>

							{commentItems || (
								<h4 className={`normal`} style={{ margin: "1rem 0" }}>
									You haven't commented on anything yet...
								</h4>
							)}
						</ProfileContentFrame>
					</div>
				</div>
			</div>
		</>
	);
}

// function TestComponent(props) {
//     useEffect(()=>{
//         console.log(`my data is ${props.data} and statement is ${!!props.data}`)
//     },[])
//
//     return(<h1>{props.data}</h1>)
// }
