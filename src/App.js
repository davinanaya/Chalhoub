import React, { Component } from 'react';
import './App.css';
import TopHeadlines from './components/News/TopHeadlines';
import NewsFiltered from './components/News/NewsFiltered';
import { Navbar, Nav } from 'react-bootstrap/';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './shared/fontAwesome';

class App extends Component {
  render() {
    return (
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand >
              <img
                alt=""
                src="./logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />
              {'Test Chalhoub Group'}
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">Top headlines</Link>
              <Link to="/news-filtered/" className="nav-link">News filtered by categories</Link>
            </Nav>
          </Navbar>

          <Route path="/" exact component={TopHeadlines} />
          <Route path="/news-filtered" component={NewsFiltered} />
        </Router>
    );
  }
}

export default App;
