import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './components/SearchPage'
import BooksShelf from './components/BooksShelf'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          books: books
        }, () => console.log('books', this.state.books))
      })
  }

  search = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query)
        .then(books => {
          if (books.error) {
            this.setState({
              searchedBooks: []
            })
          } else {
            this.setState({
              searchedBooks: books
            }, () => console.log('search', this.state.searchedBooks))
          }
        })
    } else {
      this.setState({
        searchedBooks: []
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksShelf
            books={this.state.books}
          />
        )} />

        <Route path='/search' render={() => (
          <SearchPage searchedBooks={this.state.searchedBooks} search={this.search} />
        )} />
      </div>
    )
  }
}

export default BooksApp
