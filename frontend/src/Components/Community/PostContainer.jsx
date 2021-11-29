import React, { useReducer } from "react";
// STYLES
import "./PostContainer.css";
import profile_icon from "../../Assets/img/profile.png";
import sample_img from "../../Assets/img/sample1.png";
import comment from "../../Assets/img/community/comment.png";
import report from "../../Assets/img/community/report.png";
import hide from "../../Assets/img/community/hide.png";

function PostContainer(props) {
    return (
        <div id="post-" className="post-container education-item shadow gui-element w40" >

            {/* <!-- VOTE CONTAINER --> */}
            <div className="vote-container flex-col j-c-c a-i-c">
                <form method="POST">
                    <input type="hidden" value="{{ post.url }}" name="post_url" />
                    <input type="hidden" name="form_type" value="vote" />

                    <input type="hidden" value="delete" name="upvote_method" />
                    <button className="upvote-btn noselect" type="submit" name="vote_type" value="upvote">&#8679;</button>

                    <h3 className="total-points">0</h3>

                    <input type="hidden" value="post" name="downvote_method" />
                    <button className="downvote-btn noselect" type="submit" name="vote_type" value="downvote">&#8679;</button>
                </form>
            </div>

            {/* <!-- POST CONTENT --> */}
            <div className="education-text flex-col j-c-c w90">

                {/* <!-- OWNER OF POST DETAILS --> */}
                <div className="post-details flex-row a-i-c w90">

                    <a href="{% url 'students' %}?url={{ post.owner.url }}" className="post-details-link">
                        <img className="post-details-img" src={profile_icon} alt="Post Owner"
                            title="{{ post.owner.first_name }} {{ post.owner.last_name }}" />
                    </a>
                    <div className="post-details-text">
                        <a href="{% url 'students' %}?url={{ post.owner.url }}" className="blue-link details-text text0">
                            fname lname
                        </a>
                        <div className="details-text">owner</div>
                        <div className="details-text">publish_date</div>
                    </div>

                </div>

                <div className={`post-body`}>
                    The problem could come down to which box model you're using. Are you using IE?

                    When IE is in quirks mode, width is the outer width of your box, which means the padding will be inside. So the total area left inside the box is 100px - 2 * 10px = 80px in which case your 100px wide will not look right.

                    If you're in standards mode, width is the inner width of your box, and padding is added outside. So the total width of the box is 100px + 2 * 10px = 120px leaving exactly 100px inside the box for your.

                    To solve it, either adjust your CSS values for IE. (Check in Firefox to see if it looks okay there). Or even better, set a document type to kick the browser into strict mode - where also IE follows the standard box model.
                </div>

            </div>

            {/* <!-- IMAGE CONTENT --> */}
            <img className="post-image w100" src={sample_img} alt="Post Image" onclick="open_image(this)" />

            <hr className="hr90" />

            {/* <!-- POST OPTION MENU --> */}
            <div className="post-option-menu flex-row j-c-s-b a-i-c w90">

                <div className="post-option flex-row j-c-c a-i-c noselect" onclick="show_comments('{{post.url}}')">
                    <img className={`post-option-img`} src={comment} alt="Comment Icon" />
                    <div>0 comments</div>
                </div>

                <div className="post-option flex-row j-c-c a-i-c noselect" onclick="hide_post('{{post.url}}')">
                    <img className={`post-option-img`} src={hide} alt="Crossed Eye" />
                    <div>Hide</div>
                </div>

                <div className="post-option flex-row j-c-c a-i-c noselect">
                    <img className={`post-option-img`} src={report} alt="Report Flag" />
                    <div>Report</div>
                </div>

            </div>

        </div>
    )
}

export default PostContainer;