import React, { Component } from 'react';
import CurrentLocLeafletMap from './components/CurrentLocLeafletMap';
import Header from './components/Header';
import Legend from './components/Legend';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurrentLocLeafletMap />
      </div>
    );
  }
}

export default App;
