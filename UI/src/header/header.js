import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

class AppHeader extends Component {
    render() {
        return (
            <div>
                <div className="row App-header">
                    <header className="col-5 header-text">
                        Book Management
                    </header>
                    <ul className="col-7">
                        <li>
                            <Link to="/book/list"> Book List </Link>
                        </li>
                        <li> 
                            <Link to="/book/add-book"> Add Book </Link>  
                        </li>
                        <li> 
                            <Link to="/help"> Help </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AppHeader;