import React, {useReducer, useState} from "react";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import CreatePost from "./CreatePost";
import PostForm from "./PostForm";
import SortingMenu from "./SortingMenu";
import { CommunityPosts } from "./CommunityPosts";

function Community(props) {
    const [posts, setPosts] = useState([]);
    document.title = "Community - UniLab";
    document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
    document.body.classList.remove("noscroll");

    // OPEN AND CLOSE SIDE PROFILE MENU
    function changePostFormClasses(initState) {
        if (initState[0] === "post-form-closed") {
            document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
            document.body.classList.add("noscroll");
            return ["post-form-opened", "shown"];
        }
        else {
            document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
            document.body.classList.remove("noscroll");
            return ["post-form-closed", "hidden"];
        }
    }
    const initPostFormClasses = ["post-form-closed", "hidden"];
    const [postFormClasses, setPostFormClasses] = useReducer(changePostFormClasses, initPostFormClasses);

    return (
        <>
            <NavMenu />
            <div className={`main-content`}>
                <PostForm postFormClasses={postFormClasses} setPostFormClasses={setPostFormClasses} setPosts={setPosts}/>
                <CreatePost setPostFormClasses={setPostFormClasses} />
                <SortingMenu />
                <CommunityPosts posts={posts} setPosts={setPosts} />
            </div>
            <Footer />
        </>
    );
}

export default Community;