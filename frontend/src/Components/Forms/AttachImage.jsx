import React, { useRef, useState } from "react";
// STYLES
import "./AttachImage.css";

import attach_icon from "../../Assets/img/attach.png";

function AttachImage(props) {

    const attachmentRef = useRef(null);
    const spanRef = useRef(null);
    const imgPreview = useRef(null);
    const [image, setImage] = useState("");

    function getFileData(myFile) {
        var file = myFile.files[0];
        setImage(file);
        var filename = file.name;
        spanRef.current.innerHTML = filename;
        alert(file.type);
        imgPreview.current.src = URL.createObjectURL(file);
        imgPreview.current.classList.remove('hidden');
    }

    return (
        <>
            <label className={`custom-file-upload file-upload shadow`}>
                <input ref={attachmentRef} type="file" onChange={() => getFileData(attachmentRef.current)} />
                <img className={`custom-file-upload-img`} src={attach_icon} alt="" />
                <span ref={spanRef}>Attach an image</span>
            </label>
            <img src="" ref={imgPreview} className={`img-preview shadow hidden`} alt="" />
        </>
    )
}

export default AttachImage;