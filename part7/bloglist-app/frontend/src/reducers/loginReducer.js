import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/logins'

const loginReducer = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload
    },
  },
})

const { setUser } = loginReducer.actions

export const loginUser = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('user', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch(setUser(null))
  }
}

export const setLoggedUser = user => {
  return async dispatch => {
    dispatch(setUser(user))
  }
}

export default loginReducer.reducer
