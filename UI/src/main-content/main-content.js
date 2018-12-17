import React, { Component } from "react";
import { Route } from "react-router";

import BookContent from "./book/book-content";
import UserContent from "./user/user-content";
import SignupComponent from "./user/auth-form/sign-up.component";
import logInComponent from "./user/auth-form/log-in.component";

import Booklist from "./book/book-list/book-list";
import BookInput from "./book/book-form/book-create";
import BookEdit from "./book/book-form/book-edit";
import BookDetail from "./book/book-detail/book-detail";

export default class MainContent extends Component {

    render() {
        return (
            <div>
                <Route path="/" exact component={UserContent}></Route>
                <Route path="/user/signup" exact component={SignupComponent}></Route>
                <Route path="/user/login" exact component={logInComponent}></Route>

                <Route exact path="/book" component={BookContent}></Route>
                <Route exact path="/book/list" component={Booklist}></Route>
                <Route exact path="/book/add-book" component={BookInput}></Route>
                <Route exact path="/book/edit/:id" component={BookEdit} />
                <Route exact path="/book/detail/:id" component={BookDetail} />
            </div>
        );
    }
}
