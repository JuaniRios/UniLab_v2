import React, { useReducer, useState } from "react";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import PostContainer from "../Community/PostContainer";
import urlToPk from "../HelperFunctions/urlToPk";
import {useAuthState} from "../../Context";
import apiCall from "../HelperFunctions/apiCall";
import {useSearchParams} from "react-router-dom";

export default function SinglePost(props) {
    const {token} = useAuthState()
    let [searchParams, setSearchParams] = useSearchParams()

    document.title = "Community - UniLab";
	document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
	document.body.classList.remove("noscroll");

    const postUri = searchParams.get("uri")
    const pk = urlToPk(postUri)
    const url = "posts/" + pk
    const params = {
        "method": "GET"
    }
    let post;
    apiCall(url, token, params).catch(error => alert).then(data => {
        post = <PostContainer {...data} key={1} />
    })

    return (
        <>
            <NavMenu/>
            {post}
            <Footer/>
        </>
    )
}