const NewBlogForm = ({handleCreateNote, handleInputChange, blog}) => (
  <form onSubmit={handleCreateNote}>
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
)

export default NewBlogForm