import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsReducer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogsList(_, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    removingBlog(state, action) {
      return state.filter(item => item.id !== action.payload)
    },
    updatingBlog(state, action) {
      return state.map(item =>
        item.id === action.payload.id ? action.payload : item
      )
    },
  },
})

const { setBlogsList, addBlog, removingBlog, updatingBlog } =
  blogsReducer.actions

export const getAllBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogService.getAll()
    dispatch(setBlogsList(allBlogs))
  }
}

export const createNewBlog = (blog, user) => {
  return async dispatch => {
    const response = await blogService.newblog(blog)

    if (response.status === 201) {
      const newBlog = {
        ...response.data,
        user: { username: user.username, name: user.name },
      }
      dispatch(addBlog(newBlog))
    }
    return response
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    const result = await blogService.removeBlog(id)
    if (result.status === 204) {
      dispatch(removingBlog(id))
    }
    return result
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const { user } = blog
    const newBlog = await blogService.updateBlog(
      {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      },
      blog.id
    )
    dispatch(updatingBlog({ ...newBlog, user }))
  }
}

export default blogsReducer.reducer
