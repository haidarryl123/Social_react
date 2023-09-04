import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as api from "../api";

let user = localStorage.getItem('jwtUser');
    user = JSON.parse(user);
let jwtToken = localStorage.getItem('jwtToken');

const initialState = {
    isAuthenticated: false,
    user: user,
    wall: null
};

if (jwtToken !== undefined && jwtToken != null && jwtToken !== 'null' && jwtToken !== '') {
    initialState.isAuthenticated = true;
}

const AuthReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // login(state, data) {
        //     state.isAuthenticated = true;
        //     state.user = data.user;
        //     state.access_token = data.token;
        // },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.access_token = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postLoginAsync.fulfilled, (state, action) => {
            let response = action.payload;
            if (response.success){
                state.isAuthenticated = true;
                state.user = response.data.user;
                state.access_token = response.data.token;
            }
        }).addCase(getWallAsync.fulfilled, (state, action) => {
            let response = action.payload;
            if (response.success){
                state.wall = response.data;
            }
        }).addCase(deletePostOnWall.fulfilled, (state, action) => {
            let response = action.payload;
            if (response.success){
                state.wall.post = state.wall.post.filter((p) => p.id !== response.data);
            }
        })
    }
});

export const postLoginAsync = createAsyncThunk(
    "auth/login",
    async (data) => {
        return await api.login(data.email,data.password);
    }
);

export const postLogoutAsync = createAsyncThunk(
    "auth/logout",
    async () => {
        return await api.logout();
    }
);

export const postRegisterAsync = createAsyncThunk(
    "auth/register",
    async (data) => {
        return await api.register(data.email,data.password,data.name);
    }
);

export const getWallAsync = createAsyncThunk(
    "auth/profile/get-wall",
    async (userId) => {
        return await api.getWall(userId);
    }
);

export const deletePostOnWall = createAsyncThunk(
    "post/delete",
    async (postId) => {
        return await api.deletePost(postId);
    }
);

export const { login, logout } = AuthReducer.actions;

export default AuthReducer.reducer;