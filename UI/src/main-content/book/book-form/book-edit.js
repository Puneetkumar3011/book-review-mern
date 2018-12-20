import React, { Component } from 'react';
import { connect } from "react-redux";

import { updateBook, getBook, fetchBook } from "../../../store/book/actions";
import BookForm from "../book-form/book-form";

class BookEdit extends Component {
    bookId = '';
    componentDidMount() {
        this.bookId = this.props.match.params.id;
        if (this.bookId) {
            this.props.onFetchBook(this.bookId);
        }
    }

    onSubmit = (formData) => {
        this.props.onBookEdit(formData, this.bookId).then(() => {
            this.props.history.push("/book/list");
        });
    }

    render() {
        let compToDisplay = <div>Loading...</div>;
        if(this.props.bookEdit){
            compToDisplay = <BookForm submitBook={this.onSubmit} book={this.props.bookEdit}></BookForm>;
        }
        return (
            <div>
                {compToDisplay}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bookEdit: state.book.bookInContext
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchBook: (id) => dispatch(fetchBook(id)),
        onBookEdit: (book, id) => dispatch(updateBook(book, id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookEdit);