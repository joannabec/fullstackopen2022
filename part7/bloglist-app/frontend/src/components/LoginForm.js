import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { setNotificacion } from '../reducers/notificationReducer'

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
        setNotificacion({ message: error.response.data.error, type: 'error' })
      )
    }
  }

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
