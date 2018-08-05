import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <h2 className="header-title">PDX Biker</h2>
        <p className="header-subtitle">
          Find the closest bike-friendly streets near you
        </p>
      </div>
    );
  }
}
