import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import { setNotificacion } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const NewBlogForm = ({ user, newBlogFormRef }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const dispatch = useDispatch()

  const handleInputChange = e => {
    const input = e.target.name
    const data = e.target.value
    setBlog(prevState => ({
      ...prevState,
      [input]: data,
    }))
  }

  const handleCreateBlog = async e => {
    e.preventDefault()
    const res = await dispatch(createNewBlog(blog, user))
    if (res.status === 201) {
      dispatch(
        setNotificacion({
          message: `the blog ${blog.title} by ${blog.author} was added`,
          type: '',
        })
      )
      setBlog({ title: '', author: '', url: '' })
      newBlogFormRef.current.handleVisibility()
    } else if (res.status === 400) {
      dispatch(setNotificacion({ message: res.data.error, type: 'error' }))
    }
  }

  // styles
  const fieldContainer = {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <div style={fieldContainer}>
        <label htmlFor="title">title: </label>
        <input
          id="title"
          value={blog.title}
          name="title"
          onChange={handleInputChange}
          placeholder="Add the title"
        />
      </div>
      <div style={fieldContainer}>
        <label htmlFor="author">author: </label>
        <input
          id="author"
          value={blog.author}
          name="author"
          onChange={handleInputChange}
          placeholder="Add the author"
        />
      </div>
      <div style={fieldContainer}>
        <label htmlFor="url">url: </label>
        <input
          id="url"
          value={blog.url}
          name="url"
          onChange={handleInputChange}
          placeholder="Add the url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  newBlogFormRef: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default NewBlogForm
