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
    },
    timer(state, action) {
      return action.payload
    }
  }
})
export const { setMsg, removeMsg } = notificationSlice.actions

let timeout
export const setNotificacion = (string, sec) => {
  return (dispatch, setState) => {
    dispatch(setMsg(string))

    if(setState().notification) clearTimeout(timeout)

    timeout = setTimeout(() => {
      dispatch(removeMsg())
    }, sec * 1000);
  }
}

export default notificationSlice.reducer