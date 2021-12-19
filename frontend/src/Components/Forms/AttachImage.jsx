import React, {useEffect, useRef, useState} from "react";
// STYLES
import "./AttachImage.css";

import attach_icon from "../../Assets/img/attach.png";
import profile_icon from "../../Assets/img/profile.png"

function AttachImage(props) {

    const avatar = props.avatar;
    const [spanText, setSpanText] = useState("Attach an image");
    const [imgPreviewClass, setImgPreviewClass] = useState("shown");
    const [image, setImage] = [props.image, props.setImage]
    const [avatarPreviewSrc, setAvatarPreviewSrc] = useState(profile_icon);
    // const imgPreviewClass = {true: "shown", false: "hidden"}
    useEffect( () => {
        if (imgPreviewClass === "hidden") {
            setImgPreviewClass("shown")
        } else {
            setImgPreviewClass("hidden")
        }
    }, [image])

    function getFileData(event) {
        let file = event.files[0];
        if (avatar) {
            setAvatarPreviewSrc(URL.createObjectURL(file));
        }
        else {
            setImage(file);
        }
    }

    let imgUrl
    if (typeof(image) == "string") {
        imgUrl = ""
    } else {
        imgUrl = URL.createObjectURL(image)
    }

    if (!avatar) {
        return (
            <>
                <label className={`custom-file-upload file-upload shadow`}>
                    <input accept="image/*" type="file" onChange={(e) => getFileData(e.target)} />
                    <img className={`custom-file-upload-img noselect`} src={attach_icon} alt="" />
                    <span>{spanText}</span>
                </label>
                <img src={imgUrl} className={`img-preview shadow noselect ${imgPreviewClass}`} alt="" />
            </>
        )
    }

    else {
        return (
            <div className={`avatar-upload-wrapper`}>
                <img src={avatarPreviewSrc} className={`img-preview-avatar noselect`} alt="" />
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