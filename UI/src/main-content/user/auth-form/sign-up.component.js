import React, { Component } from "react";
import { connect } from "react-redux";

import { signUpUser } from "../../../store/user/action";
import AuthForm from "./auth-form";
import "./auth-form.css";

class SignupComponent extends Component {
    onSubmit = (formData) => {
        this.props.signUpHandller(formData).then(() => {
            this.props.history.push("/user/login");
        });
    }

    render() {
        return (
            <div>
                <AuthForm mode='signup' submitForm={this.onSubmit}></AuthForm>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUpHandller: (user) => dispatch(signUpUser(user))
    };
}

export default connect(null, mapDispatchToProps)(SignupComponent);