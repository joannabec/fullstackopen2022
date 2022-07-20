import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Rendering the component <Blog />', () => {
  const removeBlog = jest.fn()
  const updateLike = jest.fn()
  const blog = {
    id: '5a43fde2cbd20b12a2c34e91',
    user: {
      id: '5a43e6b6c37f3d065eaaa581',
      username: 'Jhon',
      name: 'Jhon Smith'
    },
    likes: 3,
    author: 'Joel Spolsky',
    title: 'The Joel Test: 12 Steps to Better Code',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
  }
  const user = {
    username: 'John'
  }

  let container
  beforeEach(() => {
    container = render(<Blog blog={blog} removeBlog={removeBlog} user={user} updateLike={updateLike} />).container
  })
  test('should not show url or number of likes by default', () => {
    expect(container.querySelector('.url')).not.toBeInTheDocument()
    expect(container.querySelector('.likes')).not.toBeInTheDocument()
  })

  test('should show url and number of likes after the "view" button is clicked', async () => {
    const userEv = userEvent.setup()
    const button = screen.getByText('view')
    await userEv.click(button)
    expect(container.querySelector('.url')).toBeInTheDocument()
    expect(container.querySelector('.likes')).toBeInTheDocument()
  })

  test('clicking the like button twice, the event handler should have been called 2 times', async () => {
    const userEv = userEvent.setup()
    const btnView = screen.getByText('view')
    await userEv.click(btnView)

    const btnLike = screen.getByText('like')
    await userEv.dblClick(btnLike)
    expect(updateLike).toHaveBeenCalledTimes(2)
  })
})