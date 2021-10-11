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

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
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
            }))
          }
        })
    } else {
      this.setState({
        searchedBooks: []
      })
    }
  }

  handleSelect = async (shelf, book) => {
    await BooksAPI.update(book, shelf);

      this.setState((prevstate) => ({
        books: prevstate.books.filter(b => {
          if (b.id === book.id) {
            return (book.shelf = shelf);
          } else {
            return (book);
          }
        })
      }))
  }

  // Add books from search page to bookshelf
  handleSelectSearchPage = async (shelf, book) => {
    await BooksAPI.update(book, shelf);

    book.shelf = shelf
    this.setState(prevState => ({
      // If a book is already on the homepage and its shelf is changed on the searchpage, remove it and add incoming one
      books: [...prevState.books.filter(b => b.id !== book.id), book]
    }))
  }

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
            handleSelect={this.handleSelectSearchPage}
            books={this.state.books} />
        )} />
      </div>
    )
  }
}

export default BooksApp
