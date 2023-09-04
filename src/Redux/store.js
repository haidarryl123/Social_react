import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Slice/AuthReducer';
import PostReducer from "./Slice/PostReducer";

export default configureStore({
    reducer: {
        auth: AuthReducer,
        post: PostReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
