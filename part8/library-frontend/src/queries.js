import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $genres: [String]!, $published: Int!) {
    addBook(
      title: $title
      author: $author
      genres: $genres
      published: $published
    ) {
      title
      genres
      published
      author {
        name
        bookCount
      }
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editBirthyear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`