import React, { Component } from 'react';
import ReactGA from 'react-ga';
import MapContainer from './components/MapContainer';
import Header from './components/Header';
import './App.css';

class App extends Component {
  constructor() {
    super();
    ReactGA.initialize('UA-125827074-1');
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <MapContainer />
      </div>
    );
  }
}

export default App;

