import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './components/SearchPage'
import BooksShelf from './components/BooksShelf'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          books: books
        }, () => console.log(this.state.books))
      })
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
          <SearchPage />
        )} />
      </div>
    )
  }
}

export default BooksApp
