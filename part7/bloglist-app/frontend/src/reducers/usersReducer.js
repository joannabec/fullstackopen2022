import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../services/users'

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

export default usersReducer.reducer
