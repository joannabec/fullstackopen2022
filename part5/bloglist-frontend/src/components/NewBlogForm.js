import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [ blog, setBlog ] = useState({
    title: '', author: '', url: ''
  })

  const handleInputChange = (e) => {
    const input = e.target.name;
    const data = e.target.value;
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

  return (
  <form onSubmit={handleCreateBlog}>
    <div>
      <label htmlFor="title">title: </label>
      <input
        id="title"
        value={blog.title}
        name="title"
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label htmlFor="author">author: </label>
      <input
        id="author"
        value={blog.author}
        name="author"
        onChange={handleInputChange}
      />
    </div>
    <div>
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
)}

export default NewBlogForm