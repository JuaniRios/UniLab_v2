import React from "react";

export default function PostCommentContainer(props) {
    return (
        <div className="post-comment-container shadow">
            <div className="post-comment-content">
                {props.content}
            </div>
            <div className="post-comment-btn-holder">
                <div className="uni-button post-comment-btn">View</div>
                <div className="uni-button post-comment-btn">Delete</div>
            </div>
        </div>
    )
}