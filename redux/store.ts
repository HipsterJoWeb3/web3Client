
import chapters from './chapters/slice';
import users from './users/slice';
import posts from './posts/slice';
import general from './general/slice';
import tags from './tags/slice';
import pages from './pages/slice';
import {configureStore, ThunkAction, Action, combineReducers} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { Store} from 'redux';


const rootRedusers = combineReducers({
    posts,
    users,
    chapters,
    general,
    tags,
    pages
});



const combineStores = (state, payload) =>
    Object.keys(payload).reduce((accPayload, sliceName) => {
        const slice = payload[sliceName];

        accPayload[sliceName] = Object.keys(slice).reduce((accSlice, stateName) => {
            accSlice[stateName] = slice[stateName] || state[sliceName][stateName];

            return accSlice;
        }, {});

        return accPayload;
    }, {});



const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        return combineStores(state, action.payload);
    }

    return rootRedusers(state, action);
};



export function makeStore() {
    return configureStore({
        reducer,

    });
}


export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action
    >;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



export const wrapper = createWrapper<Store>(makeStore, {debug: false});
