import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {
  const [ blog, setBlog ] = useState({
    title: '', author: '', url: ''
  })

  const handleInputChange = (e) => {
    const input = e.target.name
    const data = e.target.value
    setBlog((prevState) => ({
      ...prevState,
      [input]: data
    }))
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    const successful = await createBlog(blog)
    if (successful) setBlog({ title: '', author: '', url: '' })
  }

  // styles
  const fieldContainer = {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px'
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
        />
      </div>
      <div style={fieldContainer}>
        <label htmlFor="author">author: </label>
        <input
          id="author"
          value={blog.author}
          name="author"
          onChange={handleInputChange}
        />
      </div>
      <div style={fieldContainer}>
        <label htmlFor="url">url: </label>
        <input
          id="url"
          value={blog.url}
          name="url"
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm