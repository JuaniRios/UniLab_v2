import React from "react";
import "./ProfileContentItem.css";

function ProfileContentItem(props) {

    const mainStyle = {
        width: props.width
    };

    return (
        <div className={`profile-content-item`} style={mainStyle}>
            <img className={`profile-content-item-img shadow`} src={props.imgSrc} alt="Institution icon" />
            <div className={`profile-content-item-text`}>
                <h3 className={`profile-content-item-subtext`}>University Name / Company Name</h3>
                <h4 className={`profile-content-item-subtext normal`}>Degree Name / Job Title</h4>
                <p className={`profile-content-item-subtext`} style={{ fontStyle: "italic" }}>
                    <span>Starting Date</span>
                    <span> - </span>
                    <span>End Date</span>
                </p>
                <p className={`profile-content-item-subtext`}>
                    Description
                </p>

            </div>
        </div>
    );
}

export default ProfileContentItem; 