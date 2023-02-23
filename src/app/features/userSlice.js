import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: ""
}
export const userSlice = createSlice({
    name: `user`,
    initialState,
    reducers: {
        setUser: (state,action) => {
            state.email = action.payload
            console.log(state.email)
        }
    }
})

export const {setUser}= userSlice.actions
export default userSlice.reducer
