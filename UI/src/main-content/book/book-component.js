import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Route } from "react-router";
import { connect } from "react-redux";

import { fetchBooks } from "../../store/book/actions";
import Booklist from "./book-list/book-list";
import BookInput from "./book-form/book-create";
import BookEdit from "./book-form/book-edit";
import BookDetail from "./book-detail/book-detail";
import "./book-component.css";

class BookComponent extends Component {
    componentWillMount() {
        //this.props.fetchAllBooks();
    }

    render() {
        return (
            <React.Fragment>
                <div className="btn-div">
                    <Link className="btn btn-primary book-btn" to="/book/list">Book List</Link>
                    <Link className="btn btn-primary book-btn" to="/book/new-book">New Book</Link>
                </div>
                <div>
                    <Route exact path="/book" component={Booklist}></Route>
                    <Route path="/book/list" component={Booklist}></Route>
                    <Route path="/book/new-book" component={BookInput}></Route>
                    <Route path="/book/edit/:id" component={BookEdit} />
                    <Route path="/book/detail/:id" component={BookDetail} />
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllBooks: () => dispatch(fetchBooks())
    };
}

// export default withRouter(
//     connect(null, mapDispatchToProps)(BookComponent)
// );

export default connect(null, mapDispatchToProps)(BookComponent);