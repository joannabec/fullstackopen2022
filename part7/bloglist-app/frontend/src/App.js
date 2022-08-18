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

import { Header, Container, TopBar, Nav, Button, User } from './style/elements'
import { Heading } from './style/headings'

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
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <Header>
            <Container>
              <TopBar>
                <Nav>
                  <Link to="/">blogs</Link>
                  <Link to="/users">users</Link>
                </Nav>
                <div>
                  <User>{user.name} logged in</User>{' '}
                  <Button secondary onClick={handleLogout}>
                    log out
                  </Button>
                </div>
              </TopBar>
            </Container>
          </Header>
          <Container>
            <AlertMsg />
          </Container>
          <Container>
            <Heading>Blog app</Heading>
            <Routes>
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id" element={<UserBlog />} />
              <Route path="blogs/:id" element={<BlogView />} />
              <Route path="/" element={<Blogs user={user} />} />
            </Routes>
          </Container>
        </div>
      )}
    </div>
  )
}

export default App
