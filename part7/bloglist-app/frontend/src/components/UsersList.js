import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Heading } from '../style/headings'
import { TableUsers } from '../style/elements'

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div>
      <Heading h2>Users</Heading>
      <TableUsers>
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
      </TableUsers>
    </div>
  )
}

export default UsersList
