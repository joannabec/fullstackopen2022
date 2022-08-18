import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { BlogStyle } from '../style/elements'

const Blog = ({ blog }) => (
  <div>
    <BlogStyle>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </BlogStyle>
  </div>
)


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
