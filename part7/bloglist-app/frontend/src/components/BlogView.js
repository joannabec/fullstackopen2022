import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, updateLike, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Heading } from '../style/headings'
import { BlogContainer, Button, ButtonAction, CommentsContainer } from '../style/elements'

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
    const confirmation = window.confirm(`Remove blog ${blogSelected.title}`)
    if(confirmation) {
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
  }

  const handleComment = e => {
    e.preventDefault()
    dispatch(createComment(blogSelected, { comment: e.target.comment.value }))
    e.target.comment.value = ''
  }

  if (!blogSelected) return <p>Not found</p>
  return (
    <div>
      <BlogContainer>
        <div>
          <Heading h2>{blogSelected.title}</Heading>
          {user.username === blogSelected.user.username && (
            <Button onClick={handleRemoveBlog}>remove</Button>
          )}
        </div>
        <a href={blogSelected.url}>{blogSelected.url}</a>
        <div>
          <span>{blogSelected.likes} likes</span>
          <ButtonAction onClick={handleUpdateLike}>likes</ButtonAction>
        </div>
      </BlogContainer>
      <CommentsContainer>
        <Heading h3>Comments</Heading>
        <form onSubmit={handleComment}>
          <input name="comment" />
          <ButtonAction>add comment</ButtonAction>
        </form>
        {blogSelected.comments.length ? (
          <ul>
            {blogSelected.comments.map(item => (
              <li key={item._id}>{item.body}</li>
            ))}
          </ul>
        ) : (
          <p>No comments</p>
        )}
      </CommentsContainer>
    </div>
  )
}

export default BlogView
