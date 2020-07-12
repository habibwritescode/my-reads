import React from 'react'
import Book from './Book'
// import PropTypes from 'prop-types'

const WantToRead = (props) => {
    const wantToRead = props.books.filter(book => book.shelf === 'wantToRead')
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {wantToRead.map(book => (
                    <Book book={book} handleSelect={props.handleSelect} />
                ))}
            </ol>
        </div>
    )
}

export default WantToRead