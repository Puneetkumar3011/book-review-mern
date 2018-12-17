import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./user-content.css";

export default class UserContent extends Component{
    render(){
        return(
            <div>
                <div>
                    <strong>Welcome to Book review application</strong>
                </div>
                <div>
                    <Link className="btn btn-primary login-btn" to="/user/signup">Sign Up</Link>
                    <Link className="btn btn-default login-btn" to="/user/login">Log In</Link>
                </div>
            </div>
        );
    }
}