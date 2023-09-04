import {useParams} from 'react-router-dom';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSinglePostAsync} from "../../Redux/Slice/PostReducer";
import {Post} from "./Post";

const SinglePost = () => {
    const dispatch = useDispatch();
    const post = useSelector((state) => state.post.post);
    const { id } = useParams();

    useEffect(  () => {
        async function fetchData() {
            let response = await dispatch(getSinglePostAsync(id));
        }
        fetchData().then();
    }, [dispatch, id]);

    return (

        <>
            {post ? <Post post={post} type={'single'} /> : ''}
        </>
    );
}

export {SinglePost};