import React, { useEffect, useReducer, useState } from "react";
// STYLES
import "./PostContainer.css";
// ICONS
import profile_icon from "../../Assets/img/profile.png";
import sample_img from "../../Assets/img/sample1.png";
import comment from "../../Assets/img/community/comment.png";
import report from "../../Assets/img/community/report.png";
import hide from "../../Assets/img/community/hide.png";

import { useAuthState } from "../../Context";
import postContent from "../HelperFunctions/postContent";
import deleteContent from "../HelperFunctions/deleteContent";
import { NavLink } from "react-router-dom";
import apiCall from "../HelperFunctions/apiCall";
import timeSince from "../HelperFunctions/timeSince";
// OTHER COMPONENTS
import CommentForm from "./CommentForm";
import CommentContainer from "./CommentContainer";

function PostContainer(props) {
    const { token, userData } = useAuthState();
    const [voteCount, setVoteCount] = useState(props.votes.upvotes.length - props.votes.downvotes.length);
    const [userVote, setUserVote] = useState(props.user_vote);
    const [commentList, setCommentList] = useState()
    const [commentSection, setCommentSection] = useState("hidden");
    const toggleCommentSection = () => {
        if (commentSection === "hidden") {
            setCommentSection("shown");
        }
        else {
            setCommentSection("hidden");
        }
    };

    async function handleVote(e) {
        e.preventDefault()
        const voteType = e.target.value
        const typeConverter = { "Upvote": 1, "Downvote": 2 }
        const payload = {
            post: props.url,
            type: typeConverter[voteType],
            user: userData.url
        }
        if (userVote === voteType) {
            // post already voted, so delete the vote.
            deleteContent("vote", token, payload)
            if (voteType === "Upvote") setVoteCount(count => count - 1)
            if (voteType === "Downvote") setVoteCount(count => count + 1)
            setUserVote("")
        } else {
            // change vote.
            try {
                let response = await apiCall("vote", token,
                    { method: "POST", payload: payload })
                console.log(response)
                if (voteType === "Upvote") {
                    let votes = 1
                    if (userVote === "Downvote") votes++
                    setVoteCount(count => count + votes)
                }
                if (voteType === "Downvote") {
                    let votes = 1
                    if (userVote === "Upvote") votes++
                    setVoteCount(count => count - votes)
                }
                setUserVote(voteType)

            } catch (e) {
                console.log(e)
            }
            setUserVote(voteType)
        }

    }

    async function handleComment(e) {

    }

    let imageContent;
    if (props.image) {
        imageContent = <>
            <img className="post-image" src={props.image} alt="Post Image" />
        </>;
    } else {
        imageContent = <></>;
    }

    const upvoteState = userVote === "Upvote" ? "Upvoted" : ""
    const downvoteState = userVote === "Downvote" ? "Downvoted" : ""

    useEffect(() => {
        let commentList = []
        props.comments.forEach(comment => {
            commentList.push(<CommentContainer {...comment} />)
        })
        setCommentList(commentList)
    }, [props.comments])

    return (
        <div id="post-" className={`post-container shadow w100`} >

            {/*  VOTE CONTAINER  */}
            <div className="vote-container flex-col j-c-c a-i-c">
                <div className={`vote-container-sticky`}>

                    <button className={`upvote-btn noselect ${upvoteState}`} type="submit" name="vote_type"
                        value="Upvote" onClick={handleVote} >
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" height="100%" width="100%">
                            <polygon class="green arrow-up" points="50,1 99,50 70,50 70,99 30,99 30,50 0,50" />
                        </svg>
                    </button>

                    <h4 className="total-points">{voteCount} </h4>

                    <button className={`downvote-btn noselect ${downvoteState}`} type="submit" name="vote_type"
                        value="Downvote" onClick={handleVote} >
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" height="100%" width="100%">
                            <polygon class="red arrow-down" points="30,1 70,1 70,50 99,50 50,99 1,50 30,50" />
                        </svg>
                    </button>

                </div>

            </div>

            {/* POST CONTENT  */}
            <div className="education-text flex-col j-c-c w90">

                {/* <!-- OWNER OF POST DETAILS --> */}
                <div className="post-details flex-row a-i-c w90">

                    <NavLink to={`/students?url=${props.owner.url}`} className="post-details-link">
                        <img className="post-details-img" src={profile_icon} alt={`${props.owner.first_name} ${props.owner.last_name}'s profile picture`}
                            title={`${props.owner.first_name} ${props.owner.last_name}`} />
                    </NavLink>
                    <div className="post-details-text">
                        <NavLink to={`/students?url=${props.owner.url}`} className="blue-link details-text text0">
                            {`${props.owner.first_name} ${props.owner.last_name}`}
                        </NavLink>
                        <div className="details-text">{props.owner.user_type_verbose}</div>
                        <div className="details-text">{timeSince(props.publish_date)}</div>
                    </div>

                </div>

                {/* <!-- POST BODY --> */}

                <div className={`post-body`}>
                    {props.content}
                </div>

            </div>

            {imageContent}

            <hr className="hr90" />

            {/* <!-- POST OPTION MENU --> */}
            <div className="post-option-menu flex-row j-c-s-b a-i-c w90">

                <div className="post-option flex-row j-c-c a-i-c noselect" onClick={toggleCommentSection}>
                    <img className={`post-option-img`} src={comment} alt="Comment Icon" />
                    <div>{props.comments.length} comments</div>
                </div>

                <div className="post-option flex-row j-c-c a-i-c noselect" >
                    <img className={`post-option-img`} src={hide} alt="Crossed Eye" />
                    <div>Hide</div>
                </div>

                <div className="post-option flex-row j-c-c a-i-c noselect">
                    <img className={`post-option-img`} src={report} alt="Report Flag" />
                    <div>Report</div>
                </div>

            </div>

            <div className={`comment-section-container ${commentSection} w100`}>
                <hr className="hr90" />

                <CommentForm />
                {/* THIS HAS TO BE GENERATED IN A LOOP */}
                {commentList}
                <div className="w90" style={{ margin: "3rem auto 1rem auto", textAlign: "center" }}>
                    Be the first to comment on this post...
                </div>
            </div>

        </div>
    )
}

export default PostContainer;