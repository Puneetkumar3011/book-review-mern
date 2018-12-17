import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import classnames from 'classnames';

import { fetchBooks, deleteBook, favoriteBook, updateBook } from "../../../store/book/actions";
import { fetchFavoriteBooks } from "../../../store/favorite-book/actions";
import { API_BASE_URL } from '../../../shared/app.constants';

import "./book-list.css";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookToDelete: null,
            isDeleteBook: false
        };
    }
    componentWillMount() {
        this.props.getBooks();
    }

    deleteBookHandller = () => {
        this.props.onDeleteBook(this.state.bookToDelete).then(() => {
            this.setState({
                isDeleteBook: false,
                bookToDelete: null
            });
        });
    }

    favotiteBookHandler = (book) => {
        book.favorite = !book.favorite;
        this.props.onFavoriteBook(book).then(() => {
            this.props.onFetchFavoriteBooks();
        });
    }

    showBookDetail = (book) => {
        this.props.onUpdateBook(book, book.id);
        this.props.history.push(`/book/detail/${book.id}`);
    }

    onOpenPopup = (book) => {
        this.setState({
            isDeleteBook: true,
            bookToDelete: book
        });
    }

    onClosePopup = () => {
        this.setState({
            isDeleteBook: false,
            bookToDelete: null
        });
    }

    renderBooks() {
        if (!this.props.books) {
            return (
                <div>No Book to display</div>
            );
        }
        return this.props.books.map((book) => {
            return (
                <div key={book.id} className="row book">
                    <div className="col-md-2 img-container" onClick={() => this.showBookDetail(book)}>
                        <img className="book-image" alt="" src={API_BASE_URL + '/' + book.imageUrl}></img>
                    </div>
                    <div className="col-md-6">
                        <div className="float-left">
                            <strong>
                                {book.title}
                            </strong>
                            <div>
                                <span>Price:&nbsp;</span>
                                <span className="display-price">{book.price}</span>
                            </div>
                            <div>
                                <span>Author:&nbsp;</span>
                                <span>{book.author}</span>
                            </div>
                            <div>
                                {book.description}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 book-buttons">
                        <div>
                            <Link to={"/book/edit/" + book.id} className="btn btn-default link-display">
                                <i className="fa fa-pencil"></i>
                            </Link>
                            <a onClick={() => this.onOpenPopup(book)} className="btn btn-default link-display">
                                <i className="fa fa-trash-o"></i>
                            </a>
                            <a onClick={() => this.favotiteBookHandler(book)} className="btn btn-default link-display">
                                <i
                                    className="fa"
                                    className={classnames('fa', { 'fa-star': book.favorite }, { 'fa-star-o': !book.favorite })}
                                ></i>
                            </a>
                        </div>
                    </div>
                </div>
            );
        });
    }

    deleteConfirmation() {
        return (
            <div>
                <Modal show={this.state.isDeleteBook} bsSize="small"
                    aria-labelledby="contained-modal-title-sm">
                    <Modal.Body>
                        <h4>Confirm to delete book.</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.onClosePopup()}>Close</Button>
                        <Button onClick={() => this.deleteBookHandller()} bsStyle="primary">Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>
                    {this.renderBooks()}
                </div>
                <div>
                    {this.deleteConfirmation()}
                </div>
                <div className="text-right">
                    <Link to="/book/add-book" className="btn btn-primary">
                        <i className="fa fa-plus">&nbsp;New Book</i>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        books: state.book.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteBook: (book) => dispatch(deleteBook(book)),
        onFavoriteBook: (id) => dispatch(favoriteBook(id)),
        onFetchFavoriteBooks: () => dispatch(fetchFavoriteBooks()),
        getBooks: () => dispatch(fetchBooks()),
        onUpdateBook: (book, id) => dispatch(updateBook(book, id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
