import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import CityPage from './pages/CityPage';
import CountryPage from './pages/CountryPage';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import reportWebVitals from './reportWebVitals';

/**
 * Setup all basic stuff. Routing is done using react router and
 * slugs are used to enable the ability to send the current link
 * to other users.
 */
ReactDOM.render(
  <React.StrictMode>
    <div id="AppWrapper">
      <div id="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/search-by-country">
              <SearchPage type="Country" />
            </Route>
            <Route exact path="/search-by-city">
              <SearchPage type="City" />
            </Route>
            <Route exact path="/location/:country">
              <CountryPage />
            </Route>
            <Route exact path="/location/:country/:city">
              <CityPage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
