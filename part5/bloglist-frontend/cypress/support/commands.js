Cypress.Commands.add('createBlog', ({ title, author, url, likes, user }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {
      title,
      author,
      url,
      likes,
      user
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('logged_in')).token}`
    }
  })
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  const user = {
    name,
    username,
    password
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password
  }).then(response => {
    localStorage.setItem('logged_in', JSON.stringify(response.body))
  })
})