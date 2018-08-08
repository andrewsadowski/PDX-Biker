import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './LeafletMap.css';
import '../assets/Recommended_Bicycle_Routes.geojson';

export default class LeafletMap extends Component {
  state = {
    hasLocation: false,
    latlng: {
      lat: 45.5127,
      lng: -122.679565
    },
    zoom: 13
  };

  handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  };

  render() {
    const position = [this.state.latlng.lat, this.state.latlng.lng];
    return (
      <div>
        <Map
          className="map-element"
          center={position}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}
