import React, { createRef, Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../assets/Recommended_Bicycle_Routes.geojson';
import './EventedLeafletMap.css';

export default class CurrentLocLeafletMap extends Component {
  state = {
    hasLocation: false,
    latlng: {
      lat: 45.5127,
      lng: -122.679565
    }
  };

  mapRef = createRef();

  handleClick = () => {
    console.log(this.mapRef.current.leafletElement);
    this.mapRef.current.leafletElement.locate();
  };

  handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  };

  render() {
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>
          <span>You are here</span>
        </Popup>
      </Marker>
    ) : null;

    return (
      <Map
        className="map-element"
        center={this.state.latlng}
        length={4}
        onClick={this.handleClick}
        setView={true}
        onLocationfound={this.handleLocationFound}
        ref={this.mapRef}
        zoom={13}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marker}
      </Map>
    );
  }
}

/**
 * TODO:  Add GeoJSON to rendered map
 *        - live react-leaflet example: https://jsfiddle.net/e3zh51fp/7/
 *        - leaflet
 */
