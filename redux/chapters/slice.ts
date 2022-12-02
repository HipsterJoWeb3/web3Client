import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Chapter, ChaptersState, Status } from '../../@types/chapters';
import {RootState} from "../store";
import {HYDRATE} from "next-redux-wrapper";



const initialState: ChaptersState = {
    chapters: [],
    status: Status.LOADING,
}


export const chaptersSlice = createSlice({
    name: 'chapters',
    initialState,
    reducers: {
        setChapters: (state, action: PayloadAction<Chapter[]>) => {
            state.chapters = action.payload
            state.status = Status.SUCCESS
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action: PayloadAction<ChaptersState>) => {
            return {
                ...state.chapters,
                ...action.payload
            }
        }
    }
});

export const { setChapters } = chaptersSlice.actions;

export const chaptersData = (state: RootState) => state.chapters;

export default chaptersSlice.reducer;

