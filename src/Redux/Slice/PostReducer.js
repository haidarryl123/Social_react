import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
    posts: [],
    post: null,
    status: "idle",
    error: null,
};

export const getPostsAsync = createAsyncThunk(
    "post/get",
    async () => {
        return await api.getPosts();
    }
);

export const getSinglePostAsync = createAsyncThunk(
    "post/get-single-post",
    async (postId) => {
        return await api.getSinglePost(postId);
    }
);

export const createPostAsync = createAsyncThunk(
    "post/create",
    async (post) => {
        return await api.createPost(post);
    }
);

export const updatePostAsync = createAsyncThunk(
    "post/update",
    async (post) => {
        return await api.updatePost(post);
    }
);

export const deletePostAsync = createAsyncThunk(
    "post/delete",
    async (postId) => {
        return await api.deletePost(postId);
    }
);

export const likePostAsync = createAsyncThunk(
    "like",
    async (postId) => {
        return await api.likePost(postId);
    }
);

export const createCommentAsync = createAsyncThunk(
    "comment/create",
    async (data) => {
        return await api.createComment(data);
    }
);

export const deleteCommentAsync = createAsyncThunk(
    "comment/delete",
    async (comment_id) => {
        return await api.deleteComment(comment_id);
    }
);

export const resetError = () => {
    this.initialState.error = null;
}

const PostReducer = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getPostsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.posts = action.payload.data;
                let success = action.payload.success;
                if (success){
                    state.error = null;
                } else {
                    state.error = action.payload.message;
                }
            })
            .addCase(getPostsAsync.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.error.message;
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                state.posts.push(action.payload);
                state.error = null;
            })

            .addCase(getSinglePostAsync.fulfilled, (state, action) => {
                state.post = action.payload.data;
            })
            .addCase(updatePostAsync.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                const index = state.posts.findIndex((p) => p.id === updatedPost.id);
                if (index !== -1) {
                    state.posts[index] = updatedPost;
                }
            })
            .addCase(deletePostAsync.fulfilled, (state, action) => {
                const postId = action.payload.data;
                state.posts = state.posts.filter((p) => p.id !== postId);
            })
            .addCase(createCommentAsync.fulfilled, (state, action) => {
                const updatedPost = action.payload.post;
                const index = state.posts.findIndex((p) => p.id === updatedPost.id);
                if (index !== -1) {
                    state.posts[index] = updatedPost;
                }
                state.post = updatedPost;
            })
            .addCase(likePostAsync.fulfilled, (state, action) => {
                const updatedPost = action.payload.data;
                const index = state.posts.findIndex((p) => p.id === updatedPost.id);
                if (index !== -1) {
                    state.posts[index] = updatedPost;
                }
                state.post = updatedPost;
            })
            .addCase(deleteCommentAsync.fulfilled, (state, action) => {
                const updatedPost = action.payload.data;
                const index = state.posts.findIndex((p) => p.id === updatedPost.id);
                if (index !== -1) {
                    state.posts[index] = updatedPost;
                }
                state.post = updatedPost;
            });
    },
});

export default PostReducer.reducer;