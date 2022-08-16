import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
