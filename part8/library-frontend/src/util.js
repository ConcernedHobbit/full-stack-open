export const updateCache = (cache, query, addedBook) => {
  const uniqueById = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.id
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueById(allBooks.concat(addedBook))
    }
  })
}
