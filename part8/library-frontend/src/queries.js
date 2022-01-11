import { gql } from '@apollo/client'

export const CURRENT_USER = gql`
  query {
    me {
      username,
      favoriteGenre,
      id
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      id
      author {
        name
        id
      }
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      genres
      id
      author {
        name
        id
      }
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
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
      id
      author {
        name
        bookCount
        id
      }
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editBirthyear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
      bookCount
      id
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