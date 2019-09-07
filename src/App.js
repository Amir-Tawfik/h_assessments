import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DynamicForm from "./components/DynamicForm"
import HotelDetails from './components/HotelDetails';
import './App.css';

export default function App() {

  const ROOMS_COUNT = 4
  const ADULT_OPTIONS = [1, 2]
  const CHILDREN_OPTIONS = [0, 1, 2]

  return (
    <Router>

      <header className="app-header">
        <Link to="/" className="btn btn-dark"><i class="fa fa-chevron-left"></i>Back</Link>
        <Link to="/" className="logo">
          <img src="../hi_mk_logo_hiltonbrandlogo_3.jpg" width="70" alt="hilton Logo" />
        </Link>
        <h4>Hotel Details</h4>
      </header>

      <Route path="/" exact component={HotelDetails} />
      <Route path="/dynamicform" render={() => <DynamicForm roomsCount={ROOMS_COUNT} childrenOptions={CHILDREN_OPTIONS} adultOptions={ADULT_OPTIONS} />} />

      <footer>
          <p><a href="/">Privacy</a>
            <a href="/">Sitemap</a>
            <Link to="/dynamicform">DynamicForm</Link>
            Hilton Assessment | 2019 Amir Tawfik</p>
      </footer>
    </Router>
  );
}