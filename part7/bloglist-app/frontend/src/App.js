import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { getAllBlogs } from './reducers/blogReducer'
import { setNotificacion } from './reducers/notificationReducer'
import BlogsList from './components/BlogsList'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import AlertMsg from './components/AlertMsg'
import loginService from './services/logins'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const newBlogFormRef = useRef()

  useEffect(() => {
    const userLogged = window.localStorage.getItem('user')
    if (userLogged) {
      setUser(JSON.parse(userLogged))
    }
    dispatch(getAllBlogs())
  }, [])

  const dispatch = useDispatch()

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const response = await loginService.login({ username, password })
      setUser(response)
      window.localStorage.setItem('user', JSON.stringify(response))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(
        setNotificacion({ message: error.response.data.error, type: 'error' })
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div>
      <h1>blogs</h1>
      <AlertMsg />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      )}
      {user && (
        <div>
          <span>{user.name} logged in</span>{' '}
          <button onClick={handleLogout}>log out</button>
          <div>
            <h2>create new</h2>
            <Togglable buttonLabel="Add blog" ref={newBlogFormRef}>
              <NewBlogForm newBlogFormRef={newBlogFormRef} user={user} />
            </Togglable>
          </div>
          <BlogsList user={user} />
        </div>
      )}
    </div>
  )
}

export default App
