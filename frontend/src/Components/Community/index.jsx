import React, { useReducer } from "react";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import CreatePost from "./CreatePost";
import PostForm from "./PostForm";
import SortingMenu from "./SortingMenu";
import PostContainer from "./PostContainer";

function Community(props) {
    document.title = "Community - UniLab";

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
                <PostForm postFormClasses={postFormClasses} setPostFormClasses={setPostFormClasses} />
                <CreatePost setPostFormClasses={setPostFormClasses} />
                <SortingMenu />
                <PostContainer />
            </div>
            <Footer />
        </>
    );
}

export default Community;