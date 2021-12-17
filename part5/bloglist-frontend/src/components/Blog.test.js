import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let user
  let mockLikeHandler
  let blog
  let component

  beforeEach(() => {
    mockLikeHandler = jest.fn()

    user = {
      username: 'camil',
      name: 'Camilla Fakeperson',
      id: '61a9498558369ab82d207903'
    }

    blog = {
      title: 'Basics of Potions',
      author: 'Severus Snape',
      url: 'halfblood.prince',
      likes: 27,
      user
    }

    component = render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
      />
    )
  })

  test('renders title and author by default', () => {
    expect(component.container).toHaveTextContent('Basics of Potions')
    expect(component.container).toHaveTextContent('Severus Snape')
  })

  test('does not render other information by default', () => {
    expect(component.container).not.toHaveTextContent('halfblood.prince')
    expect(component.container).not.toHaveTextContent('27')
    expect(component.container).not.toHaveTextContent('Camilla Fakeperson')
  })

  test('renders all information when expanded', () => {
    fireEvent.click(
      component.container.querySelector('.clickable')
    )

    // Default information
    expect(component.container).toHaveTextContent('Basics of Potions')
    expect(component.container).toHaveTextContent('Severus Snape')

    // Additional information
    expect(component.container).toHaveTextContent('halfblood.prince')
    expect(component.container).toHaveTextContent('27')
    expect(component.container).toHaveTextContent('Camilla Fakeperson')
  })

  test('can be liked twice', () => {
    // Has to be expanded for like button to show
    fireEvent.click(
      component.container.querySelector('.clickable')
    )
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})