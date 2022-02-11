import React, {useEffect, useState} from "react";
import CloseButton from "../Buttons/CloseButton";
import BasicInput from "../Forms/BasicInput";
import TextArea from "../Forms/TextArea";
// STYLES
import "./UniversityForm.css";
import {CSSTransition} from "react-transition-group";
import AttachImage from "../Forms/AttachImage";
import SelectorInput from "../Forms/SelectorInput";
import DoubleInputWrap from "../Forms/DoubleInputWrap";
import GeneralForm from "../Forms/GeneralForm";
import {useAuthState} from "../../Context";
import apiCall from "../HelperFunctions/apiCall";
import {useMessage} from "../../Context/context";

export default function UniversityForm(props) {
	const {token} = useAuthState()
	const [message, setMessage] = useMessage()
	const [formToggled, setFormToggled] = props.toggle
	const [uniName, setUniName] = useState("")
	const [uniSize, setUniSize] = useState("")
	const [uniCity, setUniCity] = useState("")
	const [uniCountry, setUniCountry] = useState("")
	const [uniWebsite, setUniWebsite] = useState("")
	const [uniVideo, setUniVideo] = useState("")
	const [uniDescription, setUniDescription] = useState("")
	const [uniImage, setUniImage] = useState("")
	const [formSubmit, setFormSubmit] = useState(false)

	// useEffect(handleUniversitySubmit, [formSubmit])

	async function handleUniversitySubmit(e) {
		e.preventDefault()
		const payload = {
			"name": uniName,
			"student_range": uniSize,
			"city": uniCity,
			"country": uniCountry,
			"website_url": uniWebsite,
			"video_url": uniVideo,
			"description": uniDescription,
			"image": uniImage
		}
		const params = {
			"payload": payload,
			"method": "POST"
		}

		apiCall("universities", token, params)
			.then(response => {
				console.log(response)
				setFormToggled(false)
				setMessage("University created successfully!")

			})
			.catch(error => {
				console.log(error)
				setMessage("There was an error creating the university. Please try again later.")
			})

	}

	return (
		<>
			<GeneralForm formToggle={[formToggled, setFormToggled]} title={"Create a new University"}
				handleSubmit={handleUniversitySubmit} submitText={"Submit"}>

				<DoubleInputWrap>
					<BasicInput label={"University Name"} required={true} value={uniName} setter={setUniName}/>
					<SelectorInput label={"Size"} required={false} vale={uniSize} setter={setUniSize}
						choices={{"<5000 Students": 1, "5000-15000 Students": 2, ">15000 Students": 3}}/>
				</DoubleInputWrap>

				<DoubleInputWrap>
					<BasicInput label={"City"} required={false} value={uniCity} setter={setUniCity}/>
					<BasicInput label={"Country"} required={false} value={uniCountry} setter={setUniCountry}/>
				</DoubleInputWrap>

				<DoubleInputWrap>
					<BasicInput label={"Website URL"} required={false} value={uniWebsite} setter={setUniWebsite}/>
					<BasicInput label={"Video URL"} required={false} value={uniVideo} setter={setUniVideo}/>
				</DoubleInputWrap>

				<TextArea label={"Summary"} required={false} value={uniDescription} setter={setUniDescription}/>

				<AttachImage label={"Upload Profile Picture"} required={false} image={uniImage} setImage={setUniImage}/>

			</GeneralForm>

		</>
	);
}
