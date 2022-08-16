import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserBlog = () => {
  const id = useParams().id

  const userSelected = useSelector(state =>
    state.users.find(item => item.id === id)
  )

  if (!userSelected) return <p>Not found</p>
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
