import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBooks } from "../../../store/book/actions";
import { API_BASE_URL } from '../../../shared/app.constants';

import "./book-list.css";

class BookList extends Component {
    componentDidMount() {
        this.props.fetchBooks();
    }

    renderBooks() {
        return this.props.books.map((book) => {
            return (
                <div key={book.id} className="row book">
                    <div className="col-md-2 img-container">
                        <img className="book-image" src={API_BASE_URL + '/' + book.imageUrl}></img>
                    </div>
                    <div className="col-md-6">
                        <div className="float-left">
                            <strong>
                                {book.title}
                            </strong>
                            <div>
                                <span>Author:&nbsp;</span>
                                <span>{book.author}</span>
                            </div>
                            <div>
                                {book.desription}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 book-buttons">
                        <div>
                            <Link to={"/book/edit/" + book.id } className="btn btn-default">
                                <i className="fa fa-pencil"></i>
                            </Link>
                            <Link to="/book/delete" className="btn btn-default">
                                <i className="fa fa-trash-o"></i>
                            </Link>
                        </div>
                    </div>

                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <div>
                    {this.renderBooks()}
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

export default connect(mapStateToProps, { fetchBooks })(BookList);
