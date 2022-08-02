import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notificacion',
  initialState: null,
  reducers: {
    setMsg(state, action) {
      return action.payload
    },
    removeMsg() {
      return null
    }
  }
})
export const { setMsg, removeMsg } = notificationSlice.actions

export const setNotificacion = (string, sec) => {
  return dispatch => {
    dispatch(setMsg(string))
    setTimeout(() => {
      dispatch(removeMsg())
    }, sec * 1000);
  }
}

export default notificationSlice.reducer