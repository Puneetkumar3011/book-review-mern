import React, { Component } from 'react';
import classnames from 'classnames';

import "./book-form.css"
import TextInputGroup from "../../../shared/UI/TextInputGroup";
import { API_BASE_URL } from '../../../shared/app.constants';

class BookForm extends Component {
    displayImageLink = '';
    constructor(props) {
        super(props);
        this.state = {
            id: {
                value: (props.book ? props.book.id : ''),
                validations: {
                    required: (props.book && props.book.id ? true : false)
                },
                isValid: true
            },
            title: {
                value: props.book ? props.book.title : '',
                validations: {
                    required: true
                },
                isValid: true
            },
            description: {
                value: (props.book ? props.book.description : ''),
                validations: {
                    required: true
                },
                isValid: true
            },
            author: {
                value: (props.book ? props.book.author : ''),
                validations: {
                    required: true
                },
                isValid: true
            },
            price: {
                value: (props.book ? String(props.book.price) : ''),
                validations: {
                    required: true
                },
                isValid: true
            },
            file: {
                file: null,
                value: (props.book ? props.book.imageUrl : ''),
                validations: {
                    required: true
                },
                isValid: true
            },
            isFormValid: true
        };
        if (this.state.file.value) {
            this.displayImageLink = `${API_BASE_URL}/${this.state.file.value}`;
        }
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        let newObj = { ...this.state[name] };
        newObj.value = value;
        this.setState({ [name]: { ...newObj } },
            () => { this.checkFieldValidity(name, value) });
    }

    checkFieldValidity(name, value) {
        let isValid = true;
        let validations = this.state[name].validations;

        if (validations && validations.required) {
            isValid = (value && value.trim() !== "" && isValid);
        }

        this.setState(prevState => ({
            [name]: {
                ...prevState[name],
                isValid
            }
        }));

        return isValid;
    }

    onFileChange = e => {
        this.displayImageLink = URL.createObjectURL(e.target.files[0]);
        let fileObj = {...this.state.file};
        fileObj.file = e.target.files[0];
        fileObj.value = fileObj.value || fileObj.file.name;
        this.setState({
            file: {...fileObj}
        }, () => {
            this.checkFieldValidity('file', fileObj.value);
        });
    }

    onSubmit = event => {
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
            this.props.submitBook(this.getBookFormData());
            this.setState({ isFormValid: true });
        } else {
            this.setState({ isFormValid: false });
        }
    }

    getBookFormData = () => {
        let FormData = require('form-data');
        let formData = new FormData();
        formData.append("title", this.state.title.value);
        formData.append("description", this.state.description.value);
        formData.append("author", this.state.author.value);
        formData.append("price", this.state.price.value);
        formData.append("imageUrl", this.state.file.value);
        formData.append("file", this.state.file.file);
        return formData;
    }

    render() {
        return (
            <div className="book-form-main">
                <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                    <div className="error-label">
                        {!this.state.isFormValid ? <div>Fix Validation errors</div> : <div>&nbsp;</div>}
                    </div>
                    <div className="row">
                        <div className="input-field-div col-sm-7">
                            <TextInputGroup
                                label="Title"
                                name="title"
                                placeholder="Enter Title"
                                value={this.state.title.value}
                                onChange={this.onChange}
                                isValid={this.state.title.isValid}
                            />
                            <TextInputGroup
                                label="Description"
                                name="description"
                                placeholder="Enter Description"
                                value={this.state.description.value}
                                onChange={this.onChange}
                                isValid={this.state.description.isValid}
                            />
                            <TextInputGroup
                                label="Author"
                                name="author"
                                placeholder="Enter Author"
                                value={this.state.author.value}
                                onChange={this.onChange}
                                isValid={this.state.author.isValid}
                            />
                            <TextInputGroup
                                label="Price"
                                name="price"
                                type="number"
                                placeholder="Enter Price"
                                value={this.state.price.value}
                                onChange={this.onChange}
                                isValid={this.state.price.isValid}
                            />
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group">
                                <input
                                    type="file"
                                    className={classnames('form-control-file', {
                                        'is-invalid': !this.state.file.isValid
                                    })}
                                    name="file"
                                    onChange={this.onFileChange}
                                />
                            </div>
                            <div>
                                {this.displayImageLink
                                    ? <img className="book-form__img" alt=""
                                        src={this.displayImageLink}></img>
                                    : null
                                }
                            </div>
                            <div className="btn-div">
                                <input type="submit" value={this.state.id ? 'Update Book' : 'Add Book'} className="btn btn-primary" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default BookForm