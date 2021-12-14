import React, { useState } from "react";
// STYLES
import "./PostForm.css";
// IMAGES
import { useAuthState } from "../../Context";
import postContent from "../HelperFunctions/postContent";
// OTHER COMPONENTS
import TextArea from "../Forms/TextArea";
import AttachImage from "../Forms/AttachImage";

function PostForm(props) {
    const { token } = useAuthState()
    const setPostFormClasses = props.setPostFormClasses;
    const [postFormClass, overlayClass] = props.postFormClasses;

    const [image, setImage] = useState("");
    const [content, setContent] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()
        let payload = { content: content }
        if (image) {
            payload["image"] = image;
        }
        console.log(payload)
        postContent("posts", token, { content: content, image: image }).then(response => {
            console.log(response);
        })
    }

    return (
        <>
            <div className={`overlay overlay-10k ${overlayClass}`} onClick={setPostFormClasses} />

            <aside className={`post-form ${postFormClass} shadow custom-scroll`}>

                <button className={`post-form-close-button close-button`} onClick={setPostFormClasses} />

                <h1 className={`post-title`}>Create a post</h1>

                <TextArea width="100%" label="Write a post" />

                <AttachImage />

                <div className={`double-input-wrap post-btns`}>
                    <button className={`uni-button w100`} type="submit" name="submit" value="post" onClick={handleSubmit}>Post</button>
                </div>

            </aside>
        </>
    )
}

export default PostForm;