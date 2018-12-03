import React, { Component } from 'react';

import "./book-form.css"
import TextInputGroup from "../../../shared/UI/TextInputGroup";
import { API_BASE_URL } from '../../../shared/app.constants';

class BookForm extends Component {
    displayImageLink = '';
    constructor(props) {
        super(props);
        this.state = {
            id: props.book ? props.book.id : '',
            title: props.book ? props.book.title : '',
            description: props.book ? props.book.description : '',
            author: props.book ? props.book.author : '',
            price: props.book ? String(props.book.price) : '',
            imageUrl: props.book ? props.book.imageUrl : '',
            file: null,
            errors: {}
        };
        if(this.state.imageUrl){
            this.displayImageLink = `${API_BASE_URL}/${props.book.imageUrl}`;
        }
        this.onFileChange = this.onFileChange.bind(this);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onFileChange = e => {
        debugger;
        this.displayImageLink = URL.createObjectURL(e.target.files[0]);
        this.setState({
            file: e.target.files[0]
        });
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.submitBook(this.getBookFormData());
    }

    getBookFormData = () => {
        let FormData = require('form-data');
        let formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("author", this.state.author);
        formData.append("price", this.state.price);
        formData.append("imageUrl", this.state.imageUrl);
        formData.append("file", this.state.file);
        return formData;
    }

    render() {
        return (
            <div className="book-form-main">
                <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field-div col-sm-7">
                            <TextInputGroup
                                label="Title"
                                name="title"
                                placeholder="Enter Title"
                                value={this.state.title}
                                onChange={this.onChange}
                                error={this.state.errors.title}
                            />
                            <TextInputGroup
                                label="Description"
                                name="description"
                                placeholder="Enter Description"
                                value={this.state.description}
                                onChange={this.onChange}
                                error={this.state.errors.description}
                            />
                            <TextInputGroup
                                label="Author"
                                name="author"
                                placeholder="Enter Author"
                                value={this.state.author}
                                onChange={this.onChange}
                                error={this.state.errors.author}
                            />
                            <TextInputGroup
                                label="Price"
                                name="price"
                                type="number"
                                placeholder="Enter Price"
                                value={this.state.price}
                                onChange={this.onChange}
                                error={this.state.errors.price}
                            />
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group">
                                <input type="file" className="form-control-file" name="file" onChange={this.onFileChange} />
                            </div>
                            <div>
                                {this.state.imageUrl
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