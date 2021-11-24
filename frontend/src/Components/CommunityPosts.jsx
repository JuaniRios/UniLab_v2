import {useAuthState} from "../Context";
import {useEffect, useReducer, useState} from "react";
import {config} from "../Config/config"
import Post from "./Post"
export function CommunityPosts(props) {
    const state = useAuthState()
    const userData = state.userData
    const [posts, setPosts] = useState()
    const [page, setPage] = useState(1)
    const api_url = config.django_api

    async function fetch_posts(page) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${state.token}`
            }
        };
        const response = await fetch(api_url + "posts?" +
            `email=${userData.email}&` +
            `page=${page}`, requestOptions);

        return await response.json()
    }

    useEffect( () => {
        fetch_posts(page).then(data => {
            setPosts(data.results)
        })
    }, [page])


    if (posts){
        return(
            <>
            {posts.map(post => <Post {...post}/>)}
            </>
        )
    }

    else{
        return(
            <h4>Loading...</h4>
        )
    }


}