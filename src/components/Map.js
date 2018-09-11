import React, { createRef, Component } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  DivOverlay
} from 'react-leaflet';
// import { randomColor } from 'randomcolor';

import './Map.css';

const ARCGIS_REQUEST_URL = 'https://opendata.arcgis.com/datasets/40151125cedd49f09d211b48bb33f081_183.geojson';

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
      map.locate({
        setView: true
      });
    }
    
    L.geoJSON(geoJSON, {
      style: feature => {
        return { 
          // color: feature.properties.collor || randomColor(),
          weight: 5,
          opacity: 0.8
        }
      }
    }).addTo(map);
  }

  handleClick = () => {
    console.log('### this.mapRef:', this.mapRef)
    this.mapRef.current.leafletElement.locate();
  };

  handleLocationFound = e => {
    console.log(e);
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  };

  getGeoJsonStyle = (feature, layer) => {
    return {
      color: '#006400',
      weight: 10,
      opacity: 0.5
    };
  };

  // addWatermark = () => {
  //   const map = this.mapRef.current.leafletElement;
  //   L.Control.Watermark = L.Control.extend({
  //     onAdd: function(map) {
  //       var img = L.DomUtil.create('img');

  //       img.src = 'https://leafletjs.com/docs/images/logo.png';
  //       img.style.width = '200px';

  //       return img;
  //     }
  //   });

  //   L.control.watermark = function(opts) {
  //     return new L.Control.Watermark(opts);
  //   };

  //   L.control.watermark({ position: 'bottomleft' }).addTo(map);
  // };

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
    const { 
      status,
      latlng,
      handleLocationFound,
    } = this.props;

    return (
      <Map
        className="map-element"
        center={latlng}
        length={4}
        onClick={this.handleClick}
        setView={true}
        onLocationfound={() => handleLocationFound()}
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
 * TODO:  Add Header + Legend to
 *
 */
