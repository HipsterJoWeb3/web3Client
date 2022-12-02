import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Users, UsersState, Status } from '../../@types/users';
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "../store";


const initialState: UsersState = {
    users: [],
    user: null,
    status: Status.LOADING,
}

export interface UsersBan {
    _id: string;
    ban: boolean;
}


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<Users[]>) => {
            state.users = action.payload
            state.status = Status.SUCCESS
        },
        setUser: (state, action: PayloadAction<Users>) => {
            state.user = action.payload
            state.status = Status.SUCCESS
        },
        updateUser: (state, action: PayloadAction<Users>) => {
            state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user)
            state.status = Status.SUCCESS
        },
        banUserInnerSLice: (state, action: PayloadAction<UsersBan>) => {
            state.users = state.users.map(user => user._id === action.payload._id ? {...user, ban: action.payload.ban} : user)
            state.status = Status.SUCCESS
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    }
});

export const { setUsers } = usersSlice.actions;
export const { setUser } = usersSlice.actions;
export const { updateUser } = usersSlice.actions;
export const { banUserInnerSLice } = usersSlice.actions;

export const userData = (state: RootState) => state.users;

export default usersSlice.reducer;



