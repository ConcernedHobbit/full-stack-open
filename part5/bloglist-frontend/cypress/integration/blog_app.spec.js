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
})