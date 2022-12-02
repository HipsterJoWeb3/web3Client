import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Pages, PagesState, Status} from '../../@types/pages';
import {RootState} from "../store";
import {HYDRATE} from "next-redux-wrapper";


const initialState: PagesState = {
    pages: [],
    status: Status.LOADING,
}


export const pagesSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPages: (state, action: PayloadAction<Pages[]>) => {
            state.pages = action.payload
            state.status = Status.SUCCESS
        },
        updatePageSlice: (state, action: PayloadAction<Pages>) => {
            const index = state.pages.findIndex((page) => page._id === action.payload._id)
            state.pages[index] = action.payload
            state.status = Status.SUCCESS
        },
        addPageSlice: (state, action: PayloadAction<Pages>) => {
            state.pages.push(action.payload)
            state.status = Status.SUCCESS
        },
        removePageSlice: (state, action: PayloadAction<Pages>) => {
            state.pages = state.pages.filter((page) => page._id !== action.payload._id)
            state.status = Status.SUCCESS
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action: PayloadAction<PagesState>) => {
            return {
                ...state.pages,
                ...action.payload
            }
        }
    }
});

export const pagesData = (state: RootState) => state.pages;

export const {setPages, updatePageSlice, addPageSlice, removePageSlice} = pagesSlice.actions;

export default pagesSlice.reducer;

