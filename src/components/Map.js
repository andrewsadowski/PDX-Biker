import React, { createRef, Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import './Map.css';

const ARCGIS_REQUEST_URL =
  'https://opendata.arcgis.com/datasets/fcd1f0403cbf484bb46233b44d96f220_183.geojson';
  

export default class PDXMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = createRef();
  }

  componentDidMount() {
    const { geoJSON, status } = this.props;
    const map = this.mapRef.current.leafletElement;

    /***
     * Using navigator.geolocation.getCurrentPosition
     * in MapContainer to get users position, which is
     * then passed to Map component as props.
     */
    if (!status.locationFound) {
      map.locate({ setView: true });
    }

    L.geoJSON(geoJSON, {
      style: feature => {
        return {
          weight: 5,
          opacity: 0.8
        };
      }
    }).addTo(map);

  }

  handleClick = () => {
    console.log('### this.mapRef:', this.mapRef);
    this.mapRef.current.leafletElement.locate();
  };

  handleLocationFound = e => {
    console.log(e);
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  };

  renderMarker() {
    const { latlng } = this.props;

    return (
      <Marker position={latlng}>
        <Popup>
          <span>You are here!</span>
        </Popup>
      </Marker>
    );
  }

  render() {
    const { status, latlng, handleLocationFound } = this.props;

    return (
      <Map
        className="map-element"
        center={latlng}
        length={4}
        onClick={this.handleClick}
        setView={true}
        onLocationfound={pos =>
          handleLocationFound({
            coords: {
              latitude: pos.latitude,
              longitude: pos.longitude
            }
          })
        }
        ref={this.mapRef}
        zoom={14}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {status.locationFound && this.renderMarker()}
      </Map>
    );
  }
}

/**
 * TODO:  Add Toggle-able tile layer with topographical indicators
 *
 */
