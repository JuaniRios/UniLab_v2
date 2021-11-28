import React, { useReducer } from "react";
// STYLES
import "./PostContainer.css";

function PostContainer(props) {
    return (
        <div id="post-" class="post-container education-item shadow gui-element" >

            {/* <!-- VOTE CONTAINER --> */}
            <div class="vote-container flex-col j-c-c a-i-c">
                <form method="POST">
                    <input type="hidden" value="{{ post.url }}" name="post_url" />
                    <input type="hidden" name="form_type" value="vote" />

                    {/* <!-- Display empty or filled upvote button--> */}
                    <input type="hidden" value="delete" name="upvote_method" />
                    <button class="active-upvote noselect" type="submit" name="vote_type" value="upvote">&#8679;</button>

                    <input type="hidden" value="post" name="upvote_method" />
                    <button class="basic-upvote noselect" type="submit" name="vote_type" value="upvote">&#8679;</button>

                    <h3 class="total-points" style="margin: .5em;">0</h3>

                    {/* <!-- Display empty downvote button, or filled upvote image --> */}
                    <input type="hidden" value="delete" name="downvote_method" />
                    <button class="active-downvote noselect" type="submit" name="vote_type" value="downvote">&#8679;</button>

                    <input type="hidden" value="post" name="downvote_method" />
                    <button class="basic-downvote noselect" type="submit" name="vote_type" value="downvote">&#8679;</button>
                </form>
            </div>

            {/* <!-- POST CONTENT --> */}
            <div class="education-text flex-col j-c-c" style="width: 90%;">

                {/* <!-- OWNER OF POST DETAILS --> */}
                <div class="post-details flex-row a-i-c">

                    <a href="{% url 'students' %}?url={{ post.owner.url }}" class="post-details-link">
                        <img class="post-details-img" src="{{post.owner.image}}" alt="Post Owner"
                            title="{{ post.owner.first_name }} {{ post.owner.last_name }}" />
                    </a>
                    <div class="post-details-text">
                        <a href="{% url 'students' %}?url={{ post.owner.url }}" class="details-text text0" style="font-weight: bold;">
                            fname lname
                        </a>
                        <div class="details-text">owner</div>
                        <div class="details-text">publish_date</div>
                    </div>

                </div>

                <p>Post Body</p>

            </div>

            {/* <!-- IMAGE CONTENT --> */}
            <img class="post-image" src="{{ post.image }}" alt="Post Image" onclick="open_image(this)" />

            <hr class="hr90" />

            {/* <!-- POST OPTION MENU --> */}
            <div class="post-option-menu flex-row j-c-s-b a-i-c">
                <div class="post-option flex-row j-c-c a-i-c noselect" onclick="show_comments('{{post.url}}')">
                    <img src="{% static 'img/community/comment.png' %}" alt="Comment Icon" />
                    <div>0 comments</div>
                </div>

                <div class="post-option flex-row j-c-c a-i-c noselect" onclick="hide_post('{{post.url}}')">
                    <img src="{% static 'img/community/hide.png' %}" alt="Crossed Eye" />
                    <div>Hide</div>
                </div>

                <div class="post-option flex-row j-c-c a-i-c noselect">
                    <img src="{% static 'img/community/report.png' %}" alt="Report Flag" />
                    <div>Report</div>
                </div>
            </div>

        </div>
    )
}

export default PostContainer;