import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchFavoriteBooks } from "../store/favorite-book/actions";
import "./favorite-books.css";

class FavoriteBooks extends Component {
    // componentWillMount() {
    //     this.props.getFavoriteBooks();
    // }

    render() {
        const header = <div className="fav-book-header">Favorite Books</div>;

        if (!this.props.favBooks) {
            return (
                <div>
                    {header}
                    <div>No Book to display</div>
                </div>
            );
        }

        return (
            <div>
                {header}
                {this.props.favBooks.map((book) => {
                    return (
                        <div key={book.id} className="favorite-book">
                            <strong>
                                {book.title}
                            </strong>
                            <div>
                                <span>Price:&nbsp;</span>
                                <span className="display-price">{book.price}</span>
                            </div>
                            <div>
                                <span>Author:&nbsp;</span>
                                <span>{book.author}</span>
                            </div>
                            <div>
                                {book.description}
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        favBooks: state.favorite.books,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteBooks: () => dispatch(fetchFavoriteBooks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBooks);
