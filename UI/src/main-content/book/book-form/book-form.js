import React, { Component } from 'react';

import TextInputGroup from "../../../layout/TextInputGroup";

class BookForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.book ? props.book.title : '',
            desription: props.book ? props.book.desription : '',
            author: props.book ? props.book.author : '',
            price: props.book ? String(props.book.price) : '',
            imageUrl: props.book ? props.book.imageUrl : {},
            errors: {}
        };
    }
    
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onFileChange = (e) => {
        this.setState({ imageUrl: e.target.files[0] }, () => {
            console.log("current state {}", this.state);
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
        formData.append("desription", this.state.desription);
        formData.append("author", this.state.author);
        formData.append("price", this.state.price);
        formData.append("imageUrl", this.state.imageUrl);
        return formData;
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-header"> Edit Book</div>
                <div className="card-body">
                    <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                        <TextInputGroup
                            label="Title"
                            name="title"
                            placeholder="Enter Title"
                            value={this.state.title}
                            onChange={this.onChange}
                            error={this.state.errors.title}
                        />
                        <TextInputGroup
                            label="Desription"
                            name="desription"
                            placeholder="Enter Desription"
                            value={this.state.desription}
                            onChange={this.onChange}
                            error={this.state.errors.desription}
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
                        <div className="form-group">
                            <input type="file" className="form-control-file" name="imageUrl" onChange={this.onFileChange} />
                        </div>
                        <input
                            type="submit"
                            value="Update Book"
                            className="btn btn-light btn-block"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default BookForm;