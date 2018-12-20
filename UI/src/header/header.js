import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

class AppHeader extends Component {
    render() {
        return (
            <div>
                <div className="row App-header">
                    <div className="col-sm-5">
                        <header className="header-text">
                            <span> Book Management </span>
                        </header>
                    </div>
                    <div className="col-sm-7 header-menu">
                        <ul>
                            <li>
                                <Link to="/book"> Book </Link>
                            </li>
                            <li>
                                <Link to="/user"> User </Link>
                            </li>
                            <li>
                                <Link to="/help"> Help </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

export default AppHeader;