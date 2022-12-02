import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AnimationText, General, GeneralsState, Links, SomeInformation, Status} from '../../@types/general';
import {RootState} from "../store";
import {HYDRATE} from "next-redux-wrapper";


const initialState: GeneralsState = {
    general: null,
    status: Status.LOADING,
}


export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setGeneral: (state, action: PayloadAction<General>) => {
            state.general = action.payload
            state.status = Status.SUCCESS
        },
        updateGeneralSlice: (state, action: PayloadAction<any>) => {
            state.general = action.payload
            state.status = Status.SUCCESS
        },
        updateAnimationText: (state, action: PayloadAction<AnimationText[]>) => {
            console.log(action.payload)
        }

    },
    extraReducers: {
        [HYDRATE]: (state, action: PayloadAction<GeneralsState>) => {
            return {
                ...state.general,
                ...action.payload
            }
        }
    }
});

export const generalData = (state: RootState) => state.general;

export const {
    setGeneral,
    updateGeneralSlice,
    updateAnimationText
} = generalSlice.actions;

export default generalSlice.reducer;

