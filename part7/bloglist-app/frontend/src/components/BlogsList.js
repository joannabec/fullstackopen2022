import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogsList = () => {

  const blogs = useSelector(state =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  )

  return (
    <div>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

BlogsList.propTypes = {
  user: PropTypes.object.isRequired,
}

export default BlogsList
