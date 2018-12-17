import React, { Component } from "react";
import { connect } from "react-redux";
import TextInputGroup from "../../../shared/UI/TextInputGroup";
import "./auth-form.css";

class AuthFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: props.user ? props.user.email : '',
                validations: {
                    required: true,
                    email: true
                },
                isValid: true
            },
            name: {
                value: props.user ? props.user.name : '',
                validations: {
                    required: props.mode === 'signup'
                },
                isValid: true
            },
            password: {
                value: props.user ? props.user.password : '',
                validations: {
                    required: true
                },
                isValid: true
            },
            isFormValid: true
        }
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        let newObj = { ...this.state[name] };
        newObj.value = value;
        this.setState({ [name]: newObj });
    }

    handleBlur = e => {
        this.checkFieldValidity(e.target.name, e.target.value);
    }

    checkFieldValidity(name, value) {
        let isValid = true;
        let validations = this.state[name].validations;

        if (validations && validations.required) {
            isValid = (value && value.trim() !== "" && isValid);
        }
        if (validations && validations.email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(value) && isValid;
        }

        this.setState(prevState => ({
            [name]: {
                ...prevState[name],
                isValid
            }
        }));
        return isValid;
    }

    submitHandller = event => {
        let isFormValid = true;
        event.preventDefault();
        /** validate all fields */
        for (let key in this.state) {
            if (this.state[key]) {
                const isCheckValid = this.checkFieldValidity(key, this.state[key].value);
                isFormValid = isCheckValid && isFormValid;
                console.log(this.state[key].value);
            }
        }

        if (isFormValid) {
            this.props.submitForm(this.getFormData());
            this.setState({ isFormValid: true });
        } else {
            this.setState({ isFormValid: false });
        }
    }

    getFormData = () => {
        let formData = {};
        formData.email = this.state.email.value;
        formData.name = this.state.name.value;
        formData.password = this.state.password.value;
        return formData;
    }

    render() {
        const nameField = (this.props.mode === 'signup') ? 
             <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={this.state.name.value}
                    onChange={this.onChange}
                    onBlur={this.handleBlur}
                    isValid={this.state.name.isValid}
                /> : null;

        return (
            <form className="sign-up-form" onSubmit={this.submitHandller}>
                <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email address"
                    value={this.state.email.value}
                    onChange={this.onChange}
                    onBlur={this.handleBlur}
                    isValid={this.state.email.isValid}
                />
                {nameField}
                <TextInputGroup
                    label="Password"
                    name="password"
                    placeholder="Enter Password"
                    value={this.state.password.value}
                    onChange={this.onChange}
                    onBlur={this.handleBlur}
                    isValid={this.state.password.isValid}
                />
                <div className="form-group">
                    <div className="col-sm-offset-10 col-sm-2">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(null)(AuthFormComponent);
