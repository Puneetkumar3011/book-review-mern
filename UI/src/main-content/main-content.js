import React, { Component } from "react";
import { Route } from "react-router";

import UserComponent from "./user/user-component";
import BookComponent from "./book/book-component";

export default class MainContent extends Component {

    render() {
        return (
            <React.Fragment>
                <div>
                    <Route path="/" exact component={UserComponent}></Route>
                    <Route path="/user" component={UserComponent}></Route>

                    <Route path="/book" component={BookComponent}></Route>
                </div>
            </React.Fragment>

        );
    }
}
