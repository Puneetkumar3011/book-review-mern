import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import { getBooks, deleteBook } from "../../../store/book/actions";
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

    onDeleteBook = () => {
        debugger;
        this.props.onDeleteBook(this.state.bookToDelete).then(() => {
            this.setState({
                isDeleteBook: false,
                bookToDelete: null
            });
        });
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
                    <div className="col-md-2 img-container">
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
                        <Button onClick={() => this.onDeleteBook()} bsStyle="primary">Delete</Button>
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
        getBooks: () => dispatch(getBooks())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
