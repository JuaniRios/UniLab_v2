import React, {useEffect, useState} from "react";
// STYLES
import "./BasicList.css";
import profile_icon from "../../Assets/img/profile.png";
import apiCall from "../HelperFunctions/apiCall";
import {useAuthState, useMessage} from "../../Context/context";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
const element = <FontAwesomeIcon icon={faSearch} size="1x" color="gray" />;

function UserBar(props) {


	return (<>
		<div className={`basic-list-item shadow`}>
			<img
				className={`basic-list-item-icon`}
				src={props.image}
				alt="user"
			/>
			{props.first_name} {props.last_name}
			<div className={`basic-list-item-btn noselect`} tabIndex={1} onClick={()=>{props.changeUser(props.url, props.change)}}>
				{props.option}
			</div>
		</div>
	</>)
}

function SearchBar(props) {
	return (
		<>
			<div className={`add-new-input-field shadow`}>
				<i className={`add-new-search-icon`}>{element}</i>
				<input
					className={`add-new-input`}
					type="text"
					placeholder="Search for a user..."
					onChange={(e) => {
						props.setSearch(e.target.value)
					}}
					value={props.search}
				/>
			</div>
		</>)
}

export default function BasicList(props) {
	/*
	Props required:
		- option : "REMOVE" or "ADD"
		-

	*/
	const {setMessage} = useMessage()
	const {token, userData} = useAuthState()
	const [userList, setUserList] = useState([])
	const [search, setSearch] = useState("")
	const [forceReload, setForceReload] = props.forceReload

	useEffect(()=>{console.log(userData)}, [userData])
	useEffect( () => {
		const delayBounce = setTimeout( () => {
			retrieveUsers()
		}, 500)
		return () => clearTimeout(delayBounce)
	}, [search])

	const resource = {"university": "allowed_university_creation", "company": "allowed_company_creation"}

	async function retrieveUsers(){
		const selector = props.option === "REMOVE"
		let url = `users?${resource[props.type]}=${selector}&search=${search}`
		const params = {
			"method": "GET"
		}
		try {
			const data = await apiCall(url, token, params)
			const newUsers = data["results"].map(info =>
				<UserBar option={props.option} change={!selector} changeUser={changeUser} {...info} />)

			setUserList(newUsers)
		} catch (error) {
			alert(error)
		}

	}

	async function changeUser(userUrl, change){
		// change === true is ADD user permission
		const params = {
			"method": "PATCH",
			"payload": {
				[resource[props.type]]: change
			},
			"fullUrl": true
		}

		try {
			await apiCall(userUrl, token, params)
			setForceReload(!forceReload)
		} catch (e) {
			alert(e)
		}
	}


	useEffect( () => {
		retrieveUsers()
	}, [forceReload, props.type])

	return (
		<>
			<div className={`basic-list custom-scroll`}>
				<h4 className={`basic-list-title c-t`}>{props.title}</h4>
				<SearchBar search={search} setSearch={setSearch}/>
				{userList}
			</div>
		</>
	);
}
