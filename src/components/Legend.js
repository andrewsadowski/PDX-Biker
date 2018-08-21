import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { MapControl } from 'react-leaflet';

import './Legend.css';

export default class Legend extends MapControl {
  componentWillMount() {
    const legend = L.control({ position: 'bottomright' });
    const jsx = <div {...this.props}>{this.props.children}</div>;

    legend.onAdd = function(map) {
      let div = L.DomUtil.create('div', '');
      ReactDOM.render(jsx, div);
      return div;
    };

    this.leafletElement = legend;
  }
}
