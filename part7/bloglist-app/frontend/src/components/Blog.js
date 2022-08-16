import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    margin: '10px 0',
  }

  return (
    <div style={blogStyle}>
      <span className="title">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </span>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
