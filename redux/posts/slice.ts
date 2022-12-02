import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostsState, Status } from '../../@types/posts';
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "../store";


const initialState = {
    posts: [],
    status: Status.LOADING,
}

export interface hidePost {
    id: string;
    hide: boolean;
}


export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<any>) => {
            state.posts = [...state.posts, ...action.payload.filteredPosts.filter((post: Post) => !state.posts.find((p: Post) => p._id === post._id))]
            state.status = Status.SUCCESS
        },
        setHidePost: (state, action: PayloadAction<hidePost>) => {
            state.posts = state.posts.map(post => post._id === action.payload.id ? {...post, hidden: action.payload.hide} : post)
            state.status = Status.SUCCESS
        },
        deletePostSlice: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter(post => post._id !== action.payload)
            state.status = Status.SUCCESS
        },
        updatePostSlice: (state, action: PayloadAction<Post>) => {
            state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            state.status = Status.SUCCESS
        },
        updatePostArraySlice: (state, action: PayloadAction<Post[]>) => {
            state.posts = state.posts.map(post => action.payload.find(p => p._id === post._id) || post)
            state.status = Status.SUCCESS
        }
    },

    extraReducers: {
        [HYDRATE]: (state, action: PayloadAction<PostsState>) => {
            return {
                ...state.posts,
                ...action.payload
            }
        }
    }

});

export const { setPosts } = postsSlice.actions;

export const { setHidePost } = postsSlice.actions;

export const { deletePostSlice } = postsSlice.actions;

export const { updatePostSlice } = postsSlice.actions;

export const { updatePostArraySlice } = postsSlice.actions;

export const postsData = (state: RootState) => state.posts;

export const getPostById = (state: RootState, id: string) => state.posts.posts.find((post: Post) => post?._id === id);

export const postsDataByChapter = (state: RootState, chapter: string) => state.posts.posts.filter((post: Post) => post.chapter === chapter);

export default postsSlice.reducer;


