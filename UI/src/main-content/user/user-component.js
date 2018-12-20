import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router";

import SignupComponent from "./auth-form/sign-up.component";
import LogInComponent from "./auth-form/log-in.component";
import "./user-component.css";

export default class UserContent extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="btn-div">
                    <Link className="btn btn-primary login-btn" to="/user/signup">Sign Up</Link>
                    <Link className="btn btn-default login-btn" to="/user/login">Log In</Link>
                </div>
                <div>
                    <Route path="/user" exact component={LogInComponent}></Route>
                    <Route path="/user/login" component={LogInComponent}></Route>
                    <Route path="/user/signup" component={SignupComponent}></Route>
                </div>
            </React.Fragment>
        );
    }
}