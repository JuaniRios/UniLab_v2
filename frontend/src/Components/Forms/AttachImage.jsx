import React, { useRef, useState } from "react";
// STYLES
import "./AttachImage.css";

import attach_icon from "../../Assets/img/attach.png";
import profile_icon from "../../Assets/img/profile.png"

function AttachImage(props) {

    const avatar = props.avatar;
    const [spanText, setSpanText] = useState("Attach an image");
    const [imgPreviewClass, setImgPreviewClass] = useState("hidden");
    const [imgPreviewSrc, setImgPreviewSrc] = useState("#");
    const [avatarPreviewSrc, setAvatarPreviewSrc] = useState(profile_icon);
    function getFileData(event) {
        var file = event.files[0];
        setSpanText(file.name);
        if (avatar) {
            setAvatarPreviewSrc(URL.createObjectURL(file));
        }
        else {
            setImgPreviewSrc(URL.createObjectURL(file));
            setImgPreviewClass("shown");
        }
    }

    if (!avatar) {
        return (
            <>
                <label className={`custom-file-upload file-upload shadow`}>
                    <input accept="image/*" type="file" onChange={(e) => getFileData(e.target)} />
                    <img className={`custom-file-upload-img noselect`} src={attach_icon} alt="" />
                    <span>{spanText}</span>
                </label>
                <img src={imgPreviewSrc} className={`img-preview shadow noselect ${imgPreviewClass}`} alt="" />
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