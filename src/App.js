import React, { Component } from 'react';
import Map from './components/Map';
import Header from './components/Header';
import Legend from './components/Legend';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
