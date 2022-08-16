import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, updateLike, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const user = useSelector(state => state.login)
  const blogSelected = useSelector(state =>
    state.blogs.find(item => item.id === id)
  )

  const handleUpdateLike = () => {
    dispatch(updateLike(blogSelected))
  }

  const handleRemoveBlog = async () => {
    const res = await dispatch(deleteBlog(id))
    if (res.status === 204) {
      dispatch(
        setNotification({ message: 'The item has been deleted', type: '' })
      )
    } else {
      dispatch(
        setNotification({ message: 'An error has ocurr', type: 'error' })
      )
    }
  }

  const handleComment = e => {
    e.preventDefault()
    dispatch(createComment(blogSelected, { comment: e.target.comment.value }))
    e.target.comment.value = ''
  }

  if (!blogSelected) return <p>Not found</p>
  return (
    <div>
      <h2>{blogSelected.title}</h2>
      <a href={blogSelected.url}>{blogSelected.url}</a>
      <div>
        <span>{blogSelected.likes} likes</span>
        <button onClick={handleUpdateLike}>likes</button>
      </div>
      {user.username === blogSelected.user.username && (
        <button onClick={handleRemoveBlog}>remove</button>
      )}
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
          <input name="comment" />
          <button>add comment</button>
        </form>
        {blogSelected.comments.length ? (
          <ul>
            {blogSelected.comments.map(item => (
              <li key={item._id}>{item.body}</li>
            ))}
          </ul>
        ) : (
          <p>This blog does not have comments</p>
        )}
      </div>
    </div>
  )
}

export default BlogView
