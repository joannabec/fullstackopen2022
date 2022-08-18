import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Heading } from '../style/headings'

const UserBlog = () => {
  const id = useParams().id

  const userSelected = useSelector(state =>
    state.users.find(item => item.id === id)
  )

  if (!userSelected) return <p>Not found</p>
  return (
    <div>
      <Heading h3>{userSelected.name}</Heading>
      <Heading h4>Added blogs</Heading>
      <ul>
        {userSelected.blogs.map(blog => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlog
