import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('Creating a new blog', () => {
  test('should not show url or number of likes by default', async () => {
    const createBlog = jest.fn()
    render(<NewBlogForm createBlog={createBlog} />)

    const user = userEvent.setup()

    const inputTitle = screen.getByPlaceholderText('Add the title')
    const inputAuthor = screen.getByPlaceholderText('Add the author')
    const inputUrl = screen.getByPlaceholderText('Add the url')
    const button = screen.getByRole('button')

    await user.type(inputTitle, 'The Joel Test: 12 Steps to Better Code')
    await user.type(inputAuthor, 'Joel Spolsky')
    await user.type(inputUrl, 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/')
    await user.click(button)

    expect(createBlog).toHaveBeenCalledWith({
      author: 'Joel Spolsky',
      title: 'The Joel Test: 12 Steps to Better Code',
      url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
    })
  })
})