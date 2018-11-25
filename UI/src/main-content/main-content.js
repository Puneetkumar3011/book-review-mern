import React, { Component } from "react";
import { Route } from "react-router";
import Booklist from "./book/book-list/book-list";
import BookInput from "./book/book-input/book-input";
import BookEdit from "./book/book-edit/book-edit";


class MainContent extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={Booklist}></Route>
                <Route exact path="/book/list" exact component={Booklist}></Route>
                <Route exact path="/book/add-book" component={BookInput}></Route>
                <Route exact path="/book/edit/:id" component={BookEdit} />
            </div>
        );
    }
}

export default MainContent;