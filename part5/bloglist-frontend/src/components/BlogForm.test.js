import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('callback is submitted with proper information', () => {
    const mockSubmitHandler = jest.fn()
    const blog = {
      title: 'Basics of Potions',
      author: 'Severus Snape',
      url: 'halfblood.prince'
    }

    const component = render(
      <BlogForm
        createBlog={mockSubmitHandler}
      />
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#blog-title')
    const author = component.container.querySelector('#blog-author')
    const url = component.container.querySelector('#blog-url')

    fireEvent.change(title, {
      target: { value: blog.title }
    })

    fireEvent.change(author, {
      target: { value: blog.author }
    })

    fireEvent.change(url, {
      target: { value: blog.url }
    })


    fireEvent.submit(form)

    expect(mockSubmitHandler).toHaveBeenCalledWith({
      title: blog.title,
      author: blog.author,
      url: blog.url
    })
  })
})