import React, { Component, Fragment } from 'react';
import PDXMap from './Map';
import StatusMessage from './StatusMessage';
import { idbGeoJSON, requestGeoJSON } from '../utils';

const ARCGIS_REQUEST_URL =
  'https://opendata.arcgis.com/datasets/fcd1f0403cbf484bb46233b44d96f220_183.geojson';

export default class MapContainer extends Component {
  state = {
    status: {
      loading: false,
      locationFound: false,
      error: false,
      message: null
    },
    latlng: {
      lat: 45.5127,
      lng: -122.679565
    },
    geoJSON: null
  };

  async componentDidMount() {
    /***
     * All data needed by the Map component is loaded here. Once
     * loaded, data is passed as geoJSON and latlng props to the
     * Map component.
     *
     * The 'status' state object keeps track of loading progress
     * and any errors that may occur durring this process and is
     * passed as a prop to the StatusMessage component for display
     * to the user.
     *
     * Using async/await so that all status messages display in
     * order as the loading process progresses.
     */
    this.setState({
      status: {
        loading: true,
        message: 'Loading recommended bike routes'
      }
    });

    /***
     * Check indexedDB for stored geoJSON data.
     * If no data is found in indexedDB, make a new ARCGIS request
     * and set response data to indexedDB if the request is succesfull.
     */
    let geoJSON = await idbGeoJSON.getAll();
    if (!geoJSON || geoJSON.length < 1) {
      geoJSON = await requestGeoJSON(ARCGIS_REQUEST_URL);

      // Only set idb-store if geoJSON is defined
      geoJSON && idbGeoJSON.setAll(geoJSON);
    }
    console.log('geoJSON:', geoJSON);

    // Set error state if requestGeoJSON returns undefined
    if (!geoJSON) {
      return this.setState({
        status: {
          ...this.state.status,
          loading: false,
          error: true,
          message: 'Could not retrieve geoJSON data'
        }
      });
    }

    // Otherwise, geoJSON was succesfully retrieved
    this.setState({
      status: {
        ...this.state.status,
        loading: false
        // message: null
      },
      geoJSON: geoJSON
    });

    this.setState({
      status: {
        ...this.state.status,
        message: 'Locating your position'
      }
    });
    await navigator.geolocation.getCurrentPosition(
      this.handleLocationFound.bind(this),
      this.handleLocationError.bind(this)
    );
  }

  isLocalStorage = () => {
    if (localStorage.getItem('bikeRouteData')) {
      console.log('Thar it be');
    } else {
      console.log('Thar it aint');
    }
  };

  handleLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  handleLocationError(err) {
    console.error('Could not get current position:', err);

    this.setState({
      status: {
        ...this.state.status,
        error: true,
        message: 'Could not locate your position'
      }
    });
  }

  handleLocationFound(pos) {
    console.log('handleLocationFound, pos:', pos);
    this.setState({
      status: {
        ...this.state.status,
        locationFound: true,
        message: null
      },
      latlng: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
    });
  }

  render() {
    const { geoJSON, status, latlng } = this.state;

    return (
      <div>
        {status.loading || !status.locationFound || status.error ? (
          <StatusMessage status={status} />
        ) : null}
        {geoJSON && (
          <PDXMap
            geoJSON={geoJSON}
            status={status}
            latlng={latlng}
            handleLocationFound={this.handleLocationFound.bind(this)}
          />
        )}
      </div>
    );
  }
}
