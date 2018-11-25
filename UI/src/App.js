import React, { Component } from 'react';

import './App.css';
import AppHeader from "./header/header";
import RecentBooks from "./recent-books/recent-books";
import FavoriteBooks from "./favorite-books/favorite-books";
import MainContent from "./main-content/main-content";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader></AppHeader>
        <div className="row no-gutters">
          <div className="col-md-2 recent-books">
            <RecentBooks></RecentBooks>
          </div>
          <div className="col-md-8">
            <MainContent></MainContent>
          </div>
          <div className="col-md-2 favorites-books">
            <FavoriteBooks></FavoriteBooks>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
