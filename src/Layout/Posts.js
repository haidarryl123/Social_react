
import {Post} from "./Components/Post";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAsync } from "../Redux/Slice/PostReducer";

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);
    const status = useSelector((state) => state.post.status);
    const error = useSelector((state) => state.post.error);

    useEffect(() => {
        dispatch(getPostsAsync());
    }, [dispatch]);

    if (status === "loading") {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center">Error: {error}</div>;
    }

    return (
        <>
            {posts.map((post) => (
                <Post key={post.id} post={post} type={'multiple'} />
            ))}
        </>
    );
}

export {Posts};