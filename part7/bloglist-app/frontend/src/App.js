import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { getAllBlogs } from './reducers/blogReducer'
import { logoutUser, setLoggedUser } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import AlertMsg from './components/AlertMsg'
import Blogs from './components/Blogs'
import UsersList from './components/UsersList'
import UserBlog from './components/UserBlog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    const userLogged = window.localStorage.getItem('user')
    if (userLogged) {
      dispatch(setLoggedUser(JSON.parse(userLogged)))
    }
    dispatch(getAllBlogs())
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser(null))
  }

  return (
    <div>
      <h1>blogs</h1>
      <AlertMsg />
      {!user && <LoginForm />}
      <Router>
        {user && (
          <div>
            <span>{user.name} logged in</span>{' '}
            <button onClick={handleLogout}>log out</button>
            <Routes>
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id" element={<UserBlog />} />
              <Route path="/" element={<Blogs user={user} />} />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  )
}

export default App
