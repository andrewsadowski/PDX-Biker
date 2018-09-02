import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <h2 className="header-title">
          <span className="header-city">PDX </span>
          <br />
          Biker
        </h2>
        <p className="header-subtitle">
          Find the closest bike-friendly
          <br /> streets near you
        </p>
      </div>
    );
  }
}
