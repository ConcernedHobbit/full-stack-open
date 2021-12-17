describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Harry Potter',
      username: 'theboywholived',
      password: 'lily'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#login-form').as('form')
    cy.get('@form').find('#username')
    cy.get('@form').find('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('theboywholived')
      cy.get('#password').type('lily')
      cy.get('#log-in').click()

      cy.contains('logged in as Harry Potter.')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('h4x0rz')
      cy.get('#password').type('password')
      cy.get('#log-in').click()

      cy.get('.notification.error').should('contain', 'failed to log in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'theboywholived',
        password: 'lily'
      }).then(response => {
        localStorage.setItem('logged_in', JSON.stringify(response.body))
      })

      cy.visit('http://localhost:3000')
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#blog-title').type('Tales from Hogwarts')
      cy.get('#blog-author').type('The Boy Who Lived')
      cy.get('#blog-url').type('talesfrom.hogwarts')
      cy.get('#create-blog').click()

      cy.contains('Tales from Hogwarts by The Boy Who Lived')
    })
  })
})