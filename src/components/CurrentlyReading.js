import React from 'react'
import Book from './Book'
// import PropTypes from 'prop-types'

const CurrentlyReading = (props) => {
    const currentlyReading = props.books.filter(book => book.shelf === 'currentlyReading')
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {currentlyReading.map(book => (
                    <Book book={book} key={book.id} handleSelect={props.handleSelect} />
                ))}
            </ol>
        </div>
    )
}

export default CurrentlyReading