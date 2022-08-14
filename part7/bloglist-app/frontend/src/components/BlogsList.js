import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificacion } from '../reducers/notificationReducer'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogsList = ({ user }) => {
  const dispatch = useDispatch()

  const blogs = useSelector(state =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  )

  const handleUpdateLike = blog => {
    dispatch(updateBlog(blog))
  }

  const handleRemoveBlog = async id => {
    const res = await dispatch(deleteBlog(id))
    if (res.status === 204) {
      dispatch(
        setNotificacion({ message: 'The item has been deleted', type: '' })
      )
    } else {
      dispatch(
        setNotificacion({ message: 'An error has ocurr', type: 'error' })
      )
    }
  }

  return (
    <div>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          removeBlog={handleRemoveBlog}
          user={user}
          updateLike={handleUpdateLike}
        />
      ))}
    </div>
  )
}

BlogsList.propTypes = {
  user: PropTypes.object.isRequired,
}

export default BlogsList
