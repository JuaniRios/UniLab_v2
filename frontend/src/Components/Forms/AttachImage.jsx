import React, { useEffect, useRef, useState } from "react";
// STYLES
import "./AttachImage.css";

import attach_icon from "../../Assets/img/attach.png";
import profile_icon from "../../Assets/img/profile.png"
import {useAuthState} from "../../Context";

function AttachImage(props) {
    const avatar = props.avatar;
    const [spanText, setSpanText] = [props.spanText, props.setSpanText]
    const [imgPreviewClass, setImgPreviewClass] = useState("shown");
    const [image, setImage] = [props.image, props.setImage]
    const [imageUrl, setImageUrl] = useState()
    const {userData} = useAuthState()
    // const imgPreviewClass = {true: "shown", false: "hidden"}
    useEffect(() => {
        if (imgPreviewClass === "hidden") {
            setImgPreviewClass("shown")
        } else {
            setImgPreviewClass("hidden")
        }
    }, [image])

    useEffect( () => {
        if (avatar) {
            setImageUrl(userData.image)
        }
    }, [])

    useEffect( () => {
        if (typeof (image) !== "string") {
            setImageUrl(URL.createObjectURL(image))
        }
    }, [image])

    function getFileData(event) {
        let file = event.files[0];
        setSpanText(file.name);
        setImage(file)
        setImageUrl(URL.createObjectURL(file))
    }


    if (!avatar) {
        return (
            <>
                <label className={`custom-file-upload file-upload shadow`}>
                    <input accept="image/*" type="file" onChange={(e) => getFileData(e.target)} />
                    <img className={`custom-file-upload-img noselect`} src={attach_icon} alt="" />
                    <span>{spanText}</span>
                </label>
                <img src={imageUrl} className={`img-preview shadow noselect ${imgPreviewClass}`} alt="" />
            </>
        )
    }

    else {
        return (
            <div className={`avatar-upload-wrapper`}>
                <img src={imageUrl} className={`img-preview-avatar noselect`} alt="" />
                <div className={`flex-col`}>
                    <h4 className={`avatar-upload-title`}>Change Profile Picture</h4>
                    <label className={`custom-file-upload avatar-upload-btn shadow`}>
                        <input accept="image/*" type="file" onChange={e => getFileData(e.target)} />
                        <img className={`custom-file-upload-img noselect`} src={attach_icon} alt="" />
                        <span>{spanText}</span>
                    </label>
                </div>
            </div>
        )
    }
}

export default AttachImage;