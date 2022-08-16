import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: { message: null, type: '' },
  reducers: {
    setMsg(_, action) {
      return action.payload
    },
    delMsg() {
      return { message: null, type: '' }
    },
  },
})

const { setMsg, delMsg } = notificationReducer.actions

export const setNotification = ({ message, type }) => {
  return dispatch => {
    dispatch(setMsg({ message, type }))
    setTimeout(() => {
      dispatch(delMsg())
    }, 3000)
  }
}

export default notificationReducer.reducer
