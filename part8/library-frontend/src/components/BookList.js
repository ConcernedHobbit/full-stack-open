import React from 'react'

const BookList = ({ books }) => (
  <table>
    <tbody>
      <tr>
        <th>
          title
        </th>
        <th>
          author
        </th>
        <th>
          published
        </th>
      </tr>
      {books.map(a =>
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default BookList