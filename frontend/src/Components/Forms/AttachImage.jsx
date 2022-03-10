// Renders a custom attach an image field with a preview
// Props:
// avatar(boolean) - for attaching an avatar field,
// spanText and setSpanText - for displaying the name of the attached file,
// image and setImage - for displaying the preview of the image.
import React, { useEffect, useState } from "react";
// STYLES
import "./AttachImage.css";
// ICONS
import attach_icon from "../../Assets/img/attach.png";
// OTHER
import { useAuthState } from "../../Context";

export default function AttachImage(props) {
	const avatar = props.avatar;
	const [spanText, setSpanText] = useState(props.label);
	const [imgPreviewClass, setImgPreviewClass] = useState("shown");
	const [image, setImage] = [props.image, props.setImage];
	const [imageUrl, setImageUrl] = useState();
	const { userData } = useAuthState();
	// const imgPreviewClass = {true: "shown", false: "hidden"}
	useEffect(() => {
		if (imgPreviewClass === "hidden") {
			setImgPreviewClass("shown");
		} else {
			setImgPreviewClass("hidden");
		}
	}, [image]);
	useEffect(() => {
		if (avatar) {
			setImageUrl(userData.image);
		}
	}, []);
	useEffect(() => {
		if (typeof image !== "string") {
			setImageUrl(URL.createObjectURL(image));
		}
	}, [image]);
	function getFileData(event) {
		let file = event.files[0];
		setSpanText(file.name);
		setImage(file);
		setImageUrl(URL.createObjectURL(file));
	}
	if (!avatar) {
		return (
			<>
				<label
					className={`custom-file-upload ${
						document ? "file-upload-2" : "file-upload"
					} shadow`}
				>
					{props.document ? (
						<input type="file" onChange={(e) => getFileData(e.target)} />
					) : (
						<input
							accept="image/*"
							type="file"
							onChange={(e) => getFileData(e.target)}
						/>
					)}
					<img className={`custom-file-upload-img noselect`} src={attach_icon} alt="" />
					<span>{spanText}</span>
				</label>
				<img
					src={imageUrl}
					className={`img-preview shadow noselect ${imgPreviewClass}`}
					alt=""
				/>
			</>
		);
	} else {
		return (
			<div className={`avatar-upload-wrapper`}>
				<img src={imageUrl} className={`img-preview-avatar noselect`} alt="" />
				<div className={`flex-col`}>
					<h4 className={`avatar-upload-title`}>Change Profile Picture</h4>
					<label className={`custom-file-upload avatar-upload-btn shadow`}>
						<input
							accept="image/*"
							type="file"
							onChange={(e) => getFileData(e.target)}
						/>
						<img
							className={`custom-file-upload-img noselect`}
							src={attach_icon}
							alt=""
						/>
						<span>{spanText}</span>
					</label>
				</div>
			</div>
		);
	}
}
