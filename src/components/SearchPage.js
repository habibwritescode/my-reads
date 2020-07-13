import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
// import PropTypes from 'prop-types'

class SearchPage extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
        this.props.search(query)
    }

    render() {
        return (
            <div className="search-books" >
                <div className="search-books-bar">
                    <Link className="close-search" to='/' onClick={() => console.log('link',this.props.books)}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => this.updateQuery(e.target.value)}
                            value={this.state.query}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.searchedBooks.map(book => (
                            <Book book={book} key={book.id} handleSelect={this.props.handleSelect} />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage