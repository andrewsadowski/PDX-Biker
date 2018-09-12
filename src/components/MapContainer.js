import React, { Component } from "react";
import Map from "./Map";
import StatusMessage from "./StatusMessage";
import axios from "axios";

const ARCGIS_REQUEST_URL =
  "https://opendata.arcgis.com/datasets/40151125cedd49f09d211b48bb33f081_183.geojson";

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
        message: "Loading recommended bike routes"
      }
    });
    await axios
      .get(ARCGIS_REQUEST_URL)
      .then(response => {
        console.log("ArcGIS response:", response);
        this.setState({
          status: {
            ...this.state.status,
            loading: false
            // message: null
          },
          geoJSON: response.data
        });
      })
      .catch(err => {
        console.error("Could not retrieve geoJSON data:", err);
        this.setState({
          status: {
            ...this.state.status,
            loading: false,
            error: true,
            message: "Could not retrieve geoJSON data"
          }
        });
      });

    this.setState({
      status: {
        ...this.state.status,
        message: "Locating your position"
      }
    });
    await navigator.geolocation.getCurrentPosition(
      this.handleLocationFound.bind(this),
      this.handleLocationError.bind(this)
    );
  }

  handleLocationError(err) {
    console.error("Could not get current position:", err);

    this.setState({
      status: {
        ...this.state.status,
        error: true,
        message: "Could not locate your position"
      }
    });
  }

  handleLocationFound(pos) {
    console.log("handleLocationFound, pos:", pos);
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
          <Map
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
