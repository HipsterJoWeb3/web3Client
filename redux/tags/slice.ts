import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Status, Tags, TagsState} from '../../@types/tags';
import {RootState} from "../store";
import {HYDRATE} from "next-redux-wrapper";



const initialState: TagsState = {
    tags: [],
    status: Status.LOADING,
}


export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<Tags[]>) => {
            state.tags = action.payload
            state.status = Status.SUCCESS
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action: PayloadAction<TagsState>) => {
            return {
                ...state.tags,
                ...action.payload
            }
        }
    }
});


export const tagsData = (state: RootState) => state.tags;

export const {setTags} = tagsSlice.actions;

export default tagsSlice.reducer;

