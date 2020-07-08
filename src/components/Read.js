import React from 'react'
import Book from './Book'
// import PropTypes from 'prop-types'

const Read = (props) => {
    const read = props.books.filter(book => book.shelf === 'read')
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {read.map(book => (
                    <Book book={book} />
                ))}
            </ol>
        </div>
    )
}

export default Read