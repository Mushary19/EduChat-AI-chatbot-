import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { IUser } from "./../../lib/types/user/index"

interface IUserState {
  user: IUser | null
  isAuthenticated: boolean
}

const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IUserState["user"]>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logoutSuccess: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { loginSuccess, logoutSuccess } = userSlice.actions

export default userSlice.reducer
