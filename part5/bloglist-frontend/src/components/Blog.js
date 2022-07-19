import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog, user }) => {
  const [ visibility, setVisibility ] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    margin: '10px 0'
  }

  const handleVisibility = () => {
    setVisibility(!visibility)
  }

  const handleLike = () => {
    blogService.updateBlog({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
  }

  const handleRemove = async () => {
    const confirmation = window.confirm(`Remove blog ${blog.title}`)
    if(confirmation) removeBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title} {blog.author} </span>
      <button onClick={handleVisibility}>{ visibility ? 'hide' : 'view' }</button>
      { visibility &&
        <div>
          <span>{blog.url}</span>
          <div>
            <span>likes {blog.likes} </span>
            <button onClick={handleLike}>like</button>
          </div>
          <span>{blog.user.name}</span>
          { user.username === blog.user.username &&
            <div>
              <button onClick={handleRemove}>remove</button>
            </div>
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog