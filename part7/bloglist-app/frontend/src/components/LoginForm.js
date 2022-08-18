import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { ButtonAction, Container, Form } from '../style/elements'
import { Heading } from '../style/headings'
import AlertMsg from './AlertMsg'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async e => {
    e.preventDefault()

    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(
        setNotification({ message: error.response.data.error, type: 'error' })
      )
    }
  }

  return (
    <Container>
      <Heading>Login</Heading>
      <AlertMsg />
      <Form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="password"
            value={password}
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <ButtonAction type="submit">Login</ButtonAction>
      </Form>
    </Container>
  )
}

export default LoginForm
