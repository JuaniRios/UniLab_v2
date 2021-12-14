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
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    const [voteCount, setVoteCount] = useState(props.votes.upvotes.length - props.votes.downvotes.length);
    const [userVote, setUserVote] = useState(props.user_vote);

    const [commentSection, setCommentSection] = useState("hidden");
    const toggleCommentSection = () => {
        if (commentSection === "hidden") {
            setCommentSection("shown");
        }
        else {
            setCommentSection("hidden");
        }
    };


    function setPostVote(vote) {
        switch (vote) {
            case "Upvote":
                setDownVoted(false)
                setUpVoted(current => !current)
                break
            case "Downvote":
                setDownVoted(current => !current)
                setUpVoted(false)
                break

            default:
                break
        }
    }

    useEffect(() => {
        setPostVote(userVote)
    }, [])

    async function handleVote(e) {
        e.preventDefault()
        const voteType = e.target.value
        const typeConverter = { "Upvote": 1, "Downvote": 2 }
        const payload = {
            post: props.url,
            type: typeConverter[voteType],
            user: userData.url
        }
        setPostVote(voteType)
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
                if (voteType === "Upvote") setVoteCount(count => count + 1)
                if (voteType === "Downvote") setVoteCount(count => count - 1)
                setUserVote(voteType)

            } catch (e) {
                console.log(e)
            }
        }

    }

    async function handleComment(e) {

    }

    let imageContent;
    if (props.image) {
        imageContent = <>
            <img className="post-image w100" src={props.image} alt="Post Image" />
        </>
    } else {
        imageContent = <></>
    }

    return (
        <div id="post-" className={`post-container education-item shadow gui-element w100`} >

            {/*  VOTE CONTAINER  */}
            <div className="vote-container flex-col j-c-c a-i-c">
                <button className={`upvote-btn noselect ${upVoted ? 'Upvoted' : ''}`} type="submit" name="vote_type"
                    value="Upvote" onClick={handleVote}></button>

                <h3 className="total-points">{voteCount} </h3>

                <button className={`downvote-btn noselect ${downVoted ? 'Downvoted' : ''}`} type="submit" name="vote_type"
                    value="Downvote" onClick={handleVote}></button>
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
                    <div>0 comments</div>
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
                <CommentContainer />

                <div className="w90" style={{ margin: "3rem auto 1rem auto", textAlign: "center" }}>
                    Be the first to comment on this post...
                </div>
            </div>

        </div>
    )
}

export default PostContainer;