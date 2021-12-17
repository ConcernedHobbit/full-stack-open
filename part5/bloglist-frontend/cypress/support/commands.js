Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {
      title,
      author,
      url,
      likes
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('logged_in')).token}`
    }
  })
})