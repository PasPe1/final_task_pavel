import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../components/userProfile/userSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: { userSlice },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})


export default store;