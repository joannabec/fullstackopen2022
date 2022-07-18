import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import AlertMsg from './components/AlertMsg'
import blogService from './services/blogs'
import loginService from './services/logins'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState(null)
  const [ blog, setBlog ] = useState({
    title: '', author: '', url: ''
  })

  useEffect(() => {
    const userLogged = window.localStorage.getItem('user')
    if(userLogged) {
      setUser(JSON.parse(userLogged))
    }
    blogService.getAll().then(blogs => 
      setBlogs( blogs )
    )  
  }, [])

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

  const handleInputChange = (e) => {
    const input = e.target.name;
    const data = e.target.value;
    setBlog((prevState) => ({
      ...prevState,
      [input]: data
    }))
  }

  const handleCreateNote = async (e) => {
    e.preventDefault()

    try {
      const res = await blogService.newNote(blog)
      setBlogs(blogs.concat(res.data))
      setMsg({
        message: `the blog ${blog.title} by ${blog.author} was added`,
        type: ''
      })
      setBlog({ title: '', author: '', url: '' })
      setTimeout(() => {setMsg(null)}, 3000);
    } catch (error) {
      setMsg({ message: error.response.data.error, type: 'error' })
      setTimeout(() => {setMsg(null)}, 3000);
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
            <NewBlogForm 
              handleCreateNote={handleCreateNote}
              handleInputChange={handleInputChange}
              blog={blog}
            />
          </div>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
        </div>
      }
    </div>
  )
}

export default App
