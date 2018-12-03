import React, { Component } from "react";
import { Route } from "react-router";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { fetchBooks } from "../store/book/actions";
import Booklist from "./book/book-list/book-list";
import BookInput from "./book/book-form/book-input";
import BookEdit from "./book/book-form/book-edit";

class MainContent extends Component {
    componentWillMount(){
        this.props.fetchAllBooks();
    }

    render() {
        return (
            <div>
                <Route path="/" exact component={Booklist}></Route>
                <Route exact path="/book/list" component={Booklist}></Route>
                <Route exact path="/book/add-book" component={BookInput}></Route>
                <Route exact path="/book/edit/:id" component={BookEdit} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllBooks: () => dispatch(fetchBooks())
    };
}

export default withRouter(
    connect(null, mapDispatchToProps)(MainContent)
);