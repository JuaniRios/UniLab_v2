import React, { useState, useEffect, useRef } from "react";
// STYLES
import "./PostForm.css";
// IMAGES
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { loginUser, useAuthDispatch, useAuthState } from "../../Context";
import profile_icon from "../../Assets/img/attach.png";

function PostForm(props) {

    const setPostFormClasses = props.setPostFormClasses;
    const [postFormClass, overlayClass] = props.postFormClasses;

    const attachmentRef = useRef(null);
    const spanRef = useRef(null);
    const imgPreview = useRef(null)

    function getFileData(myFile) {
        var file = myFile.files[0];
        var filename = file.name;
        spanRef.current.innerHTML = filename;
        imgPreview.current.src = URL.createObjectURL(file);
        imgPreview.current.classList.remove('hidden');
    }

    return (
        <>
            <div className={`overlay overlay-10k ${overlayClass}`} onClick={setPostFormClasses} />

            <aside className={`post-form ${postFormClass} shadow`}>

                <button className={`post-form-close-button close-button`} onClick={setPostFormClasses} />

                <h1 className={`post-title`}>Create a post</h1>

                <textarea className={`post-textfield shadow input`} name='content' placeholder="Text..."></textarea>

                <label className={`custom-file-upload file-upload shadow`}>
                    <input ref={attachmentRef} type="file" onChange={() => getFileData(attachmentRef.current)} />
                    <img className={`custom-file-upload-img`} src={profile_icon} alt="" />
                    <span ref={spanRef}>Attach an image</span>
                </label>

                <img src="" ref={imgPreview} className={`img-preview shadow hidden`} alt="" />

                <div className={`double-input-wrap post-btns`}>
                    <button className={`uni-button w47`} type="button" onClick={setPostFormClasses}>Cancel</button>
                    <button className={`uni-button w47`} type="submit" name="submit" value="post">Post</button>
                </div>

            </aside>
        </>
    )
}

export default PostForm;