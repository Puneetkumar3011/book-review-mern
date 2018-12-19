import React, { Component } from "react";
import { connect } from "react-redux";

import { loginUser } from "../../../store/user/action";
import { fetchFavoriteBooks } from "../../../store/favorite-book/actions";
import AuthForm from "./auth-form";
import "./auth-form.css";

class LoginComponent extends Component {
    onSubmit = (formData) => {
        this.props.loginHandller(formData).then(() => {
            this.props.loadFavoriteBooks();
            this.props.history.push("/book/list");
        });
    }

    render() {
        return (
            <div>
                <AuthForm mode='login' submitForm={this.onSubmit}></AuthForm>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginHandller: (user) => dispatch(loginUser(user)),
        loadFavoriteBooks: () => dispatch(fetchFavoriteBooks())
    };
}

export default connect(null, mapDispatchToProps)(LoginComponent);