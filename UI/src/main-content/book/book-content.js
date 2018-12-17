import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchBooks } from "../../store/book/actions";

class BookContent extends Component{
    componentWillMount() {
        this.props.fetchAllBooks();
    }

    render(){
        return(
            <div>
                Book Content
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllBooks: () => dispatch(fetchBooks())
    };
}

export default connect(null, mapDispatchToProps)(BookContent);