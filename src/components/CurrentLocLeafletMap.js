import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import geojsonLayer from 'leaflet-ajax';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  GeoJSON
} from 'react-leaflet';
import axios from 'axios';
import geoJsonData from '../assets/Recommended_Bicycle_Routes.geojson';
import './CurrentLocLeafletMap.css';

var geojsonFeature = {
  type: 'Feature',
  properties: {
    OBJECTID: 1,
    TranPlanID: 'TP07-0000001',
    ConnectionType: 'SR_DC',
    StreetName: 'NW SKYLINE BLVD',
    FromStreet: 'NW BPA RD',
    ToStreet: 'NW KIELHORN MEADOW ACCESS RD',
    SHAPE_STLength__: 0,
    Shape_Length: 483.67464986824706
  },
  geometry: {
    type: 'LineString',
    coordinates: [
      [-122.81501722900539, 45.592588629458945],
      [-122.81544654555778, 45.59275424491035],
      [-122.8160666166658, 45.593032156832265],
      [-122.8186358540739, 45.5942687461779]
    ]
  }
};

export default class CurrentLocLeafletMap extends Component {
  state = {
    hasLocation: false,
    latlng: {
      lat: 45.5127,
      lng: -122.679565
    },
    geoJSON: null
  };

  mapRef = createRef();

  componentDidMount() {
    this.mapRef.current.leafletElement.locate({ setView: true });
    axios
      .get(
        'https://opendata.arcgis.com/datasets/40151125cedd49f09d211b48bb33f081_183.geojson'
      )
      .then(data => {
        const geoJSONData = data.data.features;
        this.setState({ geoJSON: geoJSONData });

        console.log(data, geoJSONData);
      });
  }

  handleClick = () => {
    this.mapRef.current.leafletElement.locate();
  };

  handleLocationFound = e => {
    console.log(e);
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  };

  mapGeoJson = () => {
    if (!this.state.geoJSON) {
      console.log('geojson is not loaded');
    } else {
      this.state.geoJSON.map(feature => (
        <GeoJSON data={feature} style={this.getGeoJsonStyle} />
      ));
    }
  };

  objMapGeoJSON = () => {
    console.log('Mapping over obj');
    Object.keys(this.state.geoJSON).map(feature => {
      return <GeoJSON data={feature} style={this.getStyle} />;
    });
  };

  getGeoJsonStyle = (feature, layer) => {
    return {
      color: '#006400',
      weight: 10,
      opacity: 0.65
    };
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
        {this.state.geoJSON ? (
          this.state.geoJSON.map(feature => {
            <GeoJSON data={feature} style={this.getGeoJsonStyle} />;
          })
        ) : (
          <GeoJSON
            data={this.state.geoJSON}
            style={this.getGeoJsonStyle}
          />
        )}
        <GeoJSON data={geojsonFeature} style={this.getGeoJsonStyle} />
      </Map>
    );
  }
}

/**
 * TODO:  Add GeoJSON to rendered map
 *        - live react-leaflet example: https://jsfiddle.net/e3zh51fp/7/
 *        - leaflet
 *        - Using leaflet-ajax: 
 *              var geojsonLayer = new L.GeoJSON.AJAX(
      'https://opendata.arcgis.com/datasets/40151125cedd49f09d211b48bb33f081_183.geojson',
         { dataType: 'geojson' }
        );
        this.setState({ geoJSON: geojsonLayer });
 */
