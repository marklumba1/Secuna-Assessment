import { configureStore } from "@reduxjs/toolkit";
import { api } from "./features/apiSlice";
import userSlice from "./features/userSlice";
const store = configureStore({
    reducer: {
        userSlice,
        [api.reducerPath] : api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
    
})

export default store