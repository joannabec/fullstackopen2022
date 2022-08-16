import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    login: loginReducer,
    users: usersReducer,
  },
})

export default store
