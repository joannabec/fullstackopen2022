import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => (
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm