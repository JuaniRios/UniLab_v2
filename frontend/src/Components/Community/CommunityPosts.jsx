import {useAuthState} from "../../Context";
import {useEffect, useState} from "react";
import Post from "./Post"
import fetchContent from "../HelperFunctions/fetchContent"
import PostContainer from "./PostContainer";

export function CommunityPosts(props) {
    const state = useAuthState()
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchContent("posts", page, state.token).then(data => {
            let appending = [];
            console.log(data)
            for (let i = 0; i<data.results.length; i++) {
                appending.push(<PostContainer {...data.results[i]} key={i}/>)
            }
            setPosts(prev => prev.concat(appending))
        })
    }, [page])


    if (posts) {
        return (
            <>
                {posts}
            </>
        )
    }

    else {
        return (
            <h4>Loading...</h4>
        )
    }


}