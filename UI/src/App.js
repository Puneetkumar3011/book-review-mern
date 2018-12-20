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
          
          {/* left panel */}
          <div className="col-md-2 left-section">
            <div className="favorites-books">
              <FavoriteBooks></FavoriteBooks>
            </div>
            <div className="recent-books">
              <RecentBooks></RecentBooks>
            </div>
          </div>
          
          {/* Main content */}
          <div className="col-md-10">
            <MainContent></MainContent>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
