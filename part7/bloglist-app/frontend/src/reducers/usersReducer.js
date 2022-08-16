import { createSlice } from '@reduxjs/toolkit'
import { getUsers, getUser } from '../services/users'

const usersReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(_, action) {
      return action.payload
    },
  },
})

const { setUsers } = usersReducer.actions

export const getAllUsers = () => {
  return async dispatch => {
    const response = await getUsers()
    dispatch(setUsers(response))
  }
}

export const getUserById = id => {
  return async dispatch => {
    const response = await getUser(id)
    if (response.status === 200) {
      dispatch(setUsers([response.data]))
    }
    return response
  }
}

export default usersReducer.reducer
