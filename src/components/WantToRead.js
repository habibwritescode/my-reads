import React from 'react'
import Book from './Book'

const WantToRead = (props) => {
    const wantToRead = props.books.filter(book => book.shelf === 'wantToRead')
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {wantToRead.map(book => (
                    <Book book={book} key={book.id} handleSelect={props.handleSelect} />
                ))}
            </ol>
        </div>
    )
}

export default WantToRead