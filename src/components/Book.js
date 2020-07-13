import React from 'react'
// import * as BooksAPI from '../BooksAPI'

class Book extends React.Component {

    render() {
        const { book } = this.props
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks ? (`url(${book.imageLinks.thumbnail})`) : '' }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => this.props.handleSelect(e.target.value, book)}>
                                <option value="move" disabled>Move to...</option>
                                <option selected={book.shelf === 'currentlyReading' ? "selected" : ''} value="currentlyReading">Currently Reading</option>
                                <option selected={book.shelf === 'wantToRead' ? "selected" : ''} value="wantToRead">Want to Read</option>
                                <option selected={book.shelf === 'read' ? "selected" : ''} value="read">Read</option>
                                <option selected={book.shelf ? "" : 'selected'} value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors ? book.authors.map(author => (
                        <div key={author} className="book-authors">{author}</div>
                    ))
                        : ''
                    }
                </div>
            </li >
        )
    }
}

export default Book