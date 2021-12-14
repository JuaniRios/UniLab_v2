import React, { useReducer } from "react";
import { NavLink } from "react-router-dom";
// STYLES
import "./CommentContainer.css";
// ICONS
import profile_icon from "../../Assets/img/profile.png";

function CommentContainer(props) {
    return (
        <div className={`comment-container w90`}>
            <img className={`comment-container-img`} src={profile_icon} alt={`Your profile picture`} title={`Post Owner`} />
            <div className={`comment-content`}>
                <NavLink to={"#"} className={"comment-owner black-link bold"}>
                    Testing Everything with long af names DSADASSDADASDASDAS
                </NavLink>
                <span className="comment-date">
                    2 months ago
                </span>
                <div className={`comment-body`}>
                    TBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMEN
                    TBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODY
                    COMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENT
                    BODYCOMMENTBODYCOMMENTBODYCOMMENTBODY
                    COMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENT
                    COMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENT
                    COMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENT
                    COMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENT
                    COMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENTBODYCOMMENT
                </div>
            </div>
        </div>
    )
}

export default CommentContainer;