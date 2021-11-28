import React, { useState, useEffect } from "react";
// STYLES
import "./CreatePost.css";
// IMAGES
import { NavLink } from "react-router-dom";

function CreatePost(props) {

    const setPostFormClasses = props.setPostFormClasses;

    return (
        <div className={`create-post flex-row a-i-c j-c-s-e w40 shadow`}>

            <NavLink className={`post-pfp shadow`} to="/profile"></NavLink>

            <h3 className={`action-btn shadow normal`} onClick={setPostFormClasses}>Create a post</h3>

        </div>
    )
}

export default CreatePost;