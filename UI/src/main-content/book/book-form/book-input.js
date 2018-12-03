import React, { Component } from 'react';
import { connect } from "react-redux";

import { createNewBook } from "../../../store/book/actions";
import BookForm from "../book-form/book-form";

class BookInput extends Component {

    onSubmit = (formData) => {
        this.props.onBookAdd(formData).then(() => {
            this.props.history.push("/book/list");
        });
    }

    render() {
        return (
            <div>
                <BookForm submitBook={this.onSubmit}></BookForm>
            </div>
        );
    }
}

const mapEventsToProps = (dispatch) => {
    return {
        onBookAdd: (book) => dispatch(createNewBook(book))
    };
}

export default connect(null, mapEventsToProps)(BookInput);