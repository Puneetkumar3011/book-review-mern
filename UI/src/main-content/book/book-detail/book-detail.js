import React, { Component } from "react";
import { connect } from "react-redux";
import { API_BASE_URL } from '../../../shared/app.constants';

import { getBook } from "../../../store/book/actions";
import "./book-detail.css";

class BookDetail extends Component {
    bookId = "";
    componentWillMount() {
        this.bookId = this.props.match.params.id;
        if (this.bookId) {
            this.props.getSelectedBook(this.bookId);
        }
    }

    render() {
        const { bookDetail } = this.props;
        const displayImageLink = bookDetail ? `${API_BASE_URL}/${bookDetail.imageUrl}` : '';
        if (!bookDetail) {
            return (
                <div>Book not found!</div>
            );
        }

        return (
            <div className="row">
                <div className="col-sm-4 left-column">
                    <img className="book-detail__img" alt=""
                        src={displayImageLink}></img>
                </div>
                <div className="col-sm-8 right-column">
                    <strong>
                        {bookDetail.title}
                    </strong>
                    <div>
                        <span>Price:&nbsp;</span>
                        <span className="display-price">{bookDetail.price}</span>
                    </div>
                    <div>
                        <span>Author:&nbsp;</span>
                        <span>{bookDetail.author}</span>
                    </div>
                    <div>
                        {bookDetail.description}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        bookDetail: state.book.bookInContext
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSelectedBook: (id) => dispatch(getBook(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);