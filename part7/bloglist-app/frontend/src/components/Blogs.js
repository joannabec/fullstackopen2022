import { useRef } from 'react'
import BlogsList from './BlogsList'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'

const Blogs = ({ user }) => {
  const newBlogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel="create new" ref={newBlogFormRef}>
        <NewBlogForm newBlogFormRef={newBlogFormRef} user={user} />
      </Togglable>
      <BlogsList user={user} />
    </div>
  )
}

export default Blogs