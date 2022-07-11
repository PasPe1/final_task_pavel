import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    companyList: [],
    userLoadingStatus: 'idle'
}

const userSlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        fetching: state => {state.userLoadingStatus = 'loading'},
        companyFetched: (state, action) => {
            state.userLoadingStatus = 'idle';
            state.companyList = action.payload;
        },
        usersFetched: (state, action) => {
            state.userLoadingStatus = 'idle';
            state.users = action.payload;
        },
        userCompanyCreated: (state, action) => {
            state.userLoadingStatus = 'idle'
            state.companyList.push(action.payload);
        },
        userCompanyDeleted: (state, action) => {
            state.userLoadingStatus = 'idle'
            state.companyList = state.companyList.filter(item => item.id !== action.payload);
        },
        usersDeleted: (state, action) => {
            state.userLoadingStatus = 'idle'
            state.users = state.users.filter(item => item.id !== action.payload);
        },
        fetchingError: state => {
            state.userLoadingStatus = 'error';
        },
        fetched: state => {state.userLoadingStatus = 'idle'}
    }
});

const {actions, reducer} = userSlice;

export default reducer;
export const {
    companyFetched,
    userCompanyCreated,
    userCompanyDeleted,
    usersFetched,
    usersDeleted,
    fetching,
    fetchingError,
    fetched
} = actions;