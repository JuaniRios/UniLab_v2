import React, {useEffect, useState} from "react";
// STYLES
// import "./BasicList.css";
import profile_icon from "../../Assets/img/profile.png";
import apiCall from "../HelperFunctions/apiCall";
import {useAuthState, useMessage} from "../../Context/context";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {CSSTransition} from "react-transition-group";
import urlToPk from "../HelperFunctions/urlToPk";
import LocalCSS from "../UniversityProfile/StudentList.module.css";
import {Link} from "react-router-dom";
const element = <FontAwesomeIcon icon={faSearch} size="1x" color="gray" />;

function UserBar(props) {
    const {userData} = useAuthState()

    return (<>
        <Link to={`/profile/${urlToPk(props.url)}`} className={`${LocalCSS.UserBar} basic-list-item shadow`}>
            <img
                className={`basic-list-item-icon`}
                src={props.image}
                alt="user"
            />

            {props.first_name} {props.last_name}

            {props.url !== userData.url &&
                <div className={`basic-list-item-btn noselect`} style={{fontSize: "2rem"}} tabIndex={1} onClick={(e) => {
                    e.preventDefault()
                    props.changeUser()
                }}>
                    {props.option === "ADD" ? "+" : "🗑"}
                </div>
            }
        </Link>
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

export default function AdminList(props) {
    const [message, setMessage] = useMessage()
    const {token, userData} = useAuthState()
    const [userList, setUserList] = useState([])
    const [search, setSearch] = useState("")
    const [forceReload, setForceReload] = props.forceReload
    const [page, setPage] = useState(1)

    useEffect(() => {
        const delayBounce = setTimeout(() => {
            if (props.companyUrl) {
                props.option === "REMOVE" ? retrieveAdmins() : retrieveNonAdmins()
            }
        }, 500)
        return () => clearTimeout(delayBounce)
    }, [search, forceReload])

    useEffect(() => {
        if (props.companyUrl) {
            props.option === "REMOVE" ? retrieveAdmins() : retrieveNonAdmins()
        }
    }, [forceReload, props.companyUrl])

    // For props.option == "ADD"
    async function retrieveNonAdmins() {
        const params = {
            "method": "GET",
            "fullUrl": false,
            "payload": {"page": page}
        }
        try {
            console.log(`running non admins with url = ${props.companyUrl}`)
            const data = await apiCall(`users?search=${search}&not_admin_of=${props.companyUrl}`, token, params)
            const newUsers = []
            data.results.forEach((info, key) => {
                newUsers.push(<UserBar option={props.option} changeUser={() => {addUser(info.url)}} key={key} {...info}/>)
            })
            setUserList(newUsers)

        } catch (error) {
            setMessage(`fetch non admins error: ${error}`)
        }
    }

    async function addUser(userUrl) {
        const params = {
            "method": "POST",
            "payload": {
                "user": userUrl,
                "company": props.companyUrl
            }
        }

        try {
            await apiCall("company-admins", token, params)
            setForceReload(!forceReload)
        } catch (e) {
            setMessage(`fetch error adding user: ${e}`)
        }
    }

     // For props.option == "DELETE"
    async function retrieveAdmins() {
        const params = {
            "method": "GET",
            "fullUrl": true
        }
        try {
            const data = await apiCall(props.companyUrl, token, params)
            const newUsers = []
            const insert_user = async (user_url, key) => {
                const info = await apiCall(user_url, token, params)
                newUsers.push(<UserBar option={props.option} changeUser={() => {
                    deleteUser(info.url)
                }} key={key} {...info} />)
            }
            for (let i=0; i<data.admins.length; i++ ) {
                await insert_user(data.admins[i], i)
            }
            setUserList(newUsers)
        } catch (error) {
            setMessage(`fetch admins error: ${error}`)
        }
    }

    async function deleteUser(adminUrl) {
        const params = {
            "method": "DELETE",
        }

        try {
            await apiCall(`company-admins?user=${adminUrl}`, token, params)
            setForceReload(!forceReload)
        } catch (e) {
            setMessage(`fetch error deleting user: ${e}`)
        }
    }

    return (<>
        <div className={`basic-list custom-scroll`}>
            <h4 className={`basic-list-title c-t`}>{props.title}</h4>
            {props.option === "ADD" && <SearchBar search={search} setSearch={setSearch}/>}
            {props.option === "ADD" && search && userList}
            {props.option === "REMOVE" && userList}
        </div>
    </>);
}
