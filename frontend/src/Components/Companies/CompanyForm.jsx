import React, {useEffect, useState} from "react";
import BasicInput from "../Forms/BasicInput";
import TextArea from "../Forms/TextArea";
// STYLES
import AttachImage from "../Forms/AttachImage";
import SelectorInput from "../Forms/SelectorInput";
import DoubleInputWrap from "../Forms/DoubleInputWrap";
import GeneralForm from "../Forms/GeneralForm";
import {useAuthState} from "../../Context";
import apiCall from "../HelperFunctions/apiCall";
import {useMessage} from "../../Context/context";

export default function CompanyForm(props) {
	const {token} = useAuthState()
	const [message, setMessage] = useMessage()
	const [formToggled, setFormToggled] = props.toggle
	const [name, setName] = useState("")
	const [size, setSize] = useState("")
	const [industry, setIndustry] = useState("")
	const [country, setCountry] = useState("")
	const [website, setWebsite] = useState("")
	const [video, setVideo] = useState("")
	const [description, setDescription] = useState("")
	const [image, setImage] = useState("")

	async function handleUniversitySubmit(e) {
		e.preventDefault()
		const payload = {
			"name": name,
			"country": country,
			"employee_range": size,
			"industry": industry,
			"website_url": website,
			"video_url": video,
			"description": description,
			"image": image
		}
		const params = {
			"payload": payload,
			"method": "POST"
		}

		apiCall("companies", token, params)
			.then(response => {
				console.log(response)
				setFormToggled(false)
				setMessage("Company created successfully!")

			})
			.catch(error => {
				console.log(error)
				setMessage("There was an error creating the company. Please try again later.")
			})


	}

	return (
		<>
			<GeneralForm formToggle={[formToggled, setFormToggled]} title={"Create a new Company"}
				handleSubmit={handleUniversitySubmit} submitText={"Submit"}>

				<DoubleInputWrap>
					<BasicInput label={"Company Name"} required={true} value={name} setter={setName}/>
					<BasicInput label={"Country"} required={false} value={country} setter={setCountry}/>
				</DoubleInputWrap>

				<DoubleInputWrap>
					<SelectorInput label={"Size"} required={false} vale={size} setter={setSize}
						choices={{"1-20 employees": 1,"21-100 employees": 2, "101-200 employees": 3,
							"201-500 employees": 4,"501+ employees": 5}}/>
					<SelectorInput label={"Size"} required={false} vale={industry} setter={setIndustry}
						choices={{"Energy, Utilities and Resources": 1, "Government and Public Sector": 2,
							"Pharmaceuticals and Life Sciences": 3, "Real Estate": 4, "Sports Business Advisory": 5,
							"Financial Services": 6,"Health Services": 7, "Industrial Manufacturing": 8,
							"Retail and Consumer Goods": 9,	"Technology, Media, and Telecommunications": 10, "Other": 11}}/>
				</DoubleInputWrap>

				<DoubleInputWrap>
					<BasicInput label={"Website URL"} required={false} value={website} setter={setWebsite}/>
					<BasicInput label={"Video URL"} required={false} value={video} setter={setVideo}/>
				</DoubleInputWrap>

				<TextArea label={"Summary"} required={false} value={description} setter={setDescription}/>

				<AttachImage label={"Upload Profile Picture"} required={false} image={image} setImage={setImage}/>

			</GeneralForm>

		</>
	);
}
