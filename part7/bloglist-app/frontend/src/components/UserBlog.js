import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../reducers/usersReducer'
import { setNotificacion } from '../reducers/notificationReducer'

const UserBlog = () => {
  const [alt, setAlt] = useState('loading...')
  const dispatch = useDispatch()
  const [userSelected] = useSelector(state => state.users)
  const id = useParams().id

  useEffect(() => {
    dispatch(getUserById(id)).then(res => {
      if (res.status === 400) {
        dispatch(setNotificacion({ message: res.data.error, type: 'error' }))
        setAlt('User does not exists')
      }
    })
  }, [])

  if (!userSelected) return <p>{alt}</p>
  return (
    <div>
      <h3>{userSelected.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {userSelected.blogs.map(blog => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlog
