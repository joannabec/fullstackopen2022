import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import { getAllBlogs } from './reducers/blogReducer'
import { logoutUser, setLoggedUser } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import AlertMsg from './components/AlertMsg'
import Blogs from './components/Blogs'
import UsersList from './components/UsersList'
import UserBlog from './components/UserBlog'
import BlogView from './components/BlogView'

const App = () => {
  const navigate = useNavigate()
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
    navigate('/')
  }

  return (
    <div>
      <AlertMsg />
      {!user ? <LoginForm /> :
        (
          <div>
            <header>
              <nav>
                <Link to="/">blogs</Link>
                <Link to="/users">users</Link>
              </nav>
              <span>{user.name} logged in</span>{' '}
              <button onClick={handleLogout}>log out</button>
            </header>
            <h1>blog app</h1>
            <Routes>
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id" element={<UserBlog />} />
              <Route path="blogs/:id" element={<BlogView />} />
              <Route path="/" element={<Blogs user={user} />} />
            </Routes>
          </div>
        )}
    </div>
  )
}

export default App
