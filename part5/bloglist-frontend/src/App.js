import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import AlertMsg from './components/AlertMsg'
import blogService from './services/blogs'
import loginService from './services/logins'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState(null)
  const newBlogFormRef = useRef()

  useEffect(() => {
    const userLogged = window.localStorage.getItem('user')
    if(userLogged) {
      setUser(JSON.parse(userLogged))
    }
    const getBlogs = async () => {
      try {
        const allBlogs = await blogService.getAll()
        setBlogs(allBlogs.sort((a, b) => b.likes - a.likes))
      } catch (error) {
        console.log(error)
      }
    }
    getBlogs()
  }, [blogs])

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await loginService.login({ username, password })
      setUser(response)
      window.localStorage.setItem('user', JSON.stringify(response))
      setUsername('')
      setPassword('')
    } catch (error) {
      setMsg({ message: error.response.data.error, type: 'error' })
      setTimeout(() => {setMsg(null)}, 3000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const res = await blogService.newNote(newBlog)
      setBlogs(blogs.concat(res.data))
      setMsg({
        message: `the blog ${newBlog.title} by ${newBlog.author} was added`,
        type: ''
      })
      setTimeout(() => {setMsg(null)}, 3000);
      newBlogFormRef.current.handleVisibility()
      return true
    } catch (error) {
      setMsg({ message: error.response.data.error, type: 'error' })
      setTimeout(() => {setMsg(null)}, 3000);
    }
  }

  const handleRemoveBlog = async (id) => {
    try {
      const result = await blogService.removeBlog(id)
      if(result.status === 204) {
        setMsg({ message: 'The item has been deleted' })
        setTimeout(() => {setMsg(null)}, 3000);
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <div>
      <h1>blogs</h1>
      {msg && <AlertMsg alert={msg}/>}
      {!user && <LoginForm 
        username={username}
        password={password}
        setPassword={setPassword}
        setUsername={setUsername}
        handleLogin={handleLogin}
      />}
      {user && 
        <div>
          <span>{ user.name } logged in</span> <button onClick={handleLogout}>log out</button>
          <div>
            <h2>create new</h2>
            <Togglable buttonLabel="Add blog" ref={newBlogFormRef}>
              <NewBlogForm 
                createBlog={handleCreateBlog}
              />
            </Togglable>
          </div>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} removeBlog={handleRemoveBlog} user={user} /> )}
        </div>
      }
    </div>
  )
}

export default App
