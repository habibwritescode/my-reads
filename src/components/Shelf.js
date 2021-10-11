import React from 'react'
import Book from './Book'

const Shelf = (props) => {
    const books = props.books.filter(book => book.shelf === props.shelf)
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(book => (
                    <Book book={book} key={book.id} handleSelect={props.handleSelect} />
                ))}
            </ol>
        </div>
    )
}

export default Shelf;