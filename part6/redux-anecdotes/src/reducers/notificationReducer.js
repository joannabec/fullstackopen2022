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

export default notificationSlice.reducer
export const { setMsg, removeMsg } = notificationSlice.actions