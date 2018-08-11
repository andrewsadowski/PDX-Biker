import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import LeafletMap from './components/LeafletMap';
import CurrentLocLeafletMap from './components/CurrentLocLeafletMap';
import Header from './components/Header';
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
