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
            this.setState(prevstate => ({
              // When books that are on the bookshelf show up on the searchpage, 
              // let them show the shelf they belong to
              searchedBooks: books.filter(b => prevstate.books.map(x => {
                if (b.id === x.id) {
                  b.shelf = x.shelf
                  return b
                } else {
                  return b
                }
              }))
            }), () => console.log('search', this.state.searchedBooks))
          }
        })
    } else {
      this.setState({
        searchedBooks: []
      })
    }
  }

  handleSelect = (shelf, book) => {
    console.log('select', shelf, book)
    // const { value } = event.target;
    BooksAPI.update(book.id, shelf)
      .then(() => (this.setState((prevstate) => ({
        books: prevstate.books.filter(b => {
          if (b.id === book.id) {
            return (book.shelf = shelf);
          } else {
            return (book);
          }
        })
      }))))
  }

  // Add books from search page to bookshelf
  // handleSelectSearchPage = (book) => {
  //   this.setState(prevState => ({
  //     books: [...prevState.books, book]
  //   }))
  // }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksShelf
            books={this.state.books}
            handleSelect={this.handleSelect}
          />
        )} />

        <Route path='/search' render={() => (
          <SearchPage
            searchedBooks={this.state.searchedBooks}
            search={this.search}
            handleSelect={this.handleSelectSearchPage} />
        )} />
      </div>
    )
  }
}

export default BooksApp
