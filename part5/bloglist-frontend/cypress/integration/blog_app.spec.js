describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.createUser({
      name: 'Harry Potter',
      username: 'theboywholived',
      password: 'lily'
    })

    cy.createUser({
      name: 'Hermione Granger',
      username: 'itsleviosah',
      password: 'houseelves'
    })

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
      cy.login({
        username: 'itsleviosah',
        password: 'houseelves'
      })

      cy.createBlog({
        title: 'Shortcuts to Success',
        author: 'Anonymous Student',
        url: 'shortcuts.success',
        likes: 13
      })

      cy.login({
        username: 'theboywholived',
        password: 'lily'
      })

      cy.createBlog({
        title: 'Secrets of Gold',
        author: 'Nicolas Flamel',
        url: 'secrets.gold',
        likes: 12
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

    it('a blog can be liked', function() {
      cy.contains('Secrets of Gold by Nicolas Flamel').click()
      cy.contains('like').click()

      cy.get('.notification.success').should('contain', 'liked')
      cy.contains('13 likes')
    })

    it('a blog they created can be removed', function() {
      cy.contains('Secrets of Gold by Nicolas Flamel').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)

      cy.get('.notification.success').should('contain', 'removed')
      cy.contains('Secrets of Gold by Nicolas Flamel').should('not.exist')
    })

    it('a blog they did not create cannot be removed', function() {
      cy.contains('Shortcuts to Success by Anonymous Student').click()
      cy.contains('remove').should('not.exist')
    })

    it.only('blogs are sorted by likes', function() {
      cy.contains('Secrets of Gold by Nicolas Flamel').click()
      cy.contains('Shortcuts to Success by Anonymous Student').click()

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('13')
        cy.wrap(blogs[1]).contains('12')
      })

      cy.contains('Secrets of Gold')
        .parent()
        .parent()
        .as('secrets')
      cy.get('@secrets')
        .contains('like')
        .as('likeSecrets')
        .click()
      cy.get('@secrets').contains('13')
      cy.get('@likeSecrets').click()
      cy.get('@secrets').contains('14')

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('14')
        cy.wrap(blogs[1]).contains('13')
      })
    })
  })
})