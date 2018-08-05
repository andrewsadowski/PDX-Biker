import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import LeafletMap from './components/LeafletMap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LeafletMap />
      </div>
    );
  }
}

export default App;
